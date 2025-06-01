package com.reverseauction.bidservice.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatusCode;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.reverseauction.bidservice.bid_enum.BidStatus;
import com.reverseauction.bidservice.dto.BidDto;
import com.reverseauction.bidservice.dto.BidResponseDto;
import com.reverseauction.bidservice.dto.ProductResponseDto;
import com.reverseauction.bidservice.entity.Bid;
import com.reverseauction.bidservice.event.BidClosedEvent;
import com.reverseauction.bidservice.exception.BidNotFoundException;
import com.reverseauction.bidservice.exception.InvalidBidAmountException;
import com.reverseauction.bidservice.exception.ProductNotFoundException;
import com.reverseauction.bidservice.repository.BidRepository;
import java.util.Comparator;

import reactor.core.publisher.Mono;

@Service
public class BidServiceImpl implements BidService {
    BidRepository bidRepository;

    private final WebClient.Builder webClientBuilder;
    private final KafkaTemplate<String, BidClosedEvent> kafkaTemplate;

    // private final KafkaTemplate<String, BidPlacedEvent> kafkaTemplate;

    public BidServiceImpl(BidRepository bidRepository, KafkaTemplate<String, BidClosedEvent> kafkaTemplate, WebClient.Builder webClientBuilder) {
        this.bidRepository = bidRepository;
        this.kafkaTemplate = kafkaTemplate;
        this.webClientBuilder = webClientBuilder;
        
    }

    @Override
    public Bid getBid(Long id) {
        Optional<Bid> bid = bidRepository.findById(id);
        if (!bid.isPresent()) {
            throw new BidNotFoundException(id);
        }

        return unwrapBid(bid, id);
    }

    @Override
    public Mono<Bid> saveBid(Bid bid) {
        String uriTemplate = "http://product-service/product/{id}";

        Mono<ProductResponseDto> productMono = webClientBuilder.build().get()
                .uri(uriTemplate, bid.getProductId())
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError,
                        error -> Mono.error(new ProductNotFoundException(bid.getProductId())))
                .bodyToMono(ProductResponseDto.class)
                .doOnError(WebClientResponseException.class, ex -> {
                    System.err.println("Error occurred: " + ex.getStatusCode() + " from " + ex.getRequest().getURI());
                });
        ;

        return productMono
                .map(productResponseDto -> {
                    // If product service is up and running, then we can save the bid
                    Long price = productResponseDto.getPrice();
                    Long bidPrice = (long) bid.getPrice();
                    Long productId = productResponseDto.getId();

                    List<BidDto> latestBid = getBidsByProductId(productId, 0, 0, true).getBids();

                    if (latestBid.size() > 0) {
                        BidDto latestBidDto = latestBid.get(0);
                        if (latestBidDto.getPrice() > bidPrice) {
                            throw new InvalidBidAmountException(bidPrice);
                        }
                    }

                    if (price == null) {
                        throw new ProductNotFoundException(bid.getProductId());
                    }

                    if (bid.getPrice() < price) {
                        throw new InvalidBidAmountException(bidPrice);
                    }

                    Bid createdBid = new Bid();
                    createdBid = bidRepository.save(bid);
                    return createdBid;
                })
                .doOnError(error -> {
                    if (error instanceof ProductNotFoundException) {
                        System.err.println(error.getMessage());
                    }
                });
    }

    @Override
    public void deleteBid(Long id) {
        bidRepository.deleteById(id);
    }

    @Override
    public List<BidDto> getBids(int pageNo, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNo, pageSize);
        Page<Bid> products = bidRepository.findAll(pageable);
        List<Bid> listOfBids = products.getContent();

        return listOfBids.stream().map(p -> mapToDto(p)).collect(Collectors.toList());
    }

    @Override
    public BidResponseDto getBidsByProductId(Long id, int pageNo, int pageSize, boolean latestOnly) {
        PageRequest pageable = latestOnly
                ? PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "createdAt")) // latest bid only
                : PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, "createdAt")); // normal paging

        Page<Bid> bidPage = bidRepository.findByProductId(id, pageable);
        List<BidDto> bidDtos = bidPage.getContent().stream().map(this::mapToDto).collect(Collectors.toList());

        return new BidResponseDto(bidDtos, bidPage.getTotalElements(), pageNo, pageSize);
    }

    // @Override
    // public Bid updateBid(Double amount, Long id, Long userId, Long productId) {
    // Optional<Bid> bid = bidRepository.findByUserIdAndproductId(userId,
    // productId);
    // Bid unwrappedGrade = unwrapBid(bid, id);
    // unwrappedGrade.setPrice(amount);
    // return bidRepository.save(unwrappedGrade);
    // }

    static Bid unwrapBid(Optional<Bid> entity, Long id) {
        if (entity.isPresent())
            return entity.get();
        else
            throw new BidNotFoundException(id);
    }

    public void handleProductDeletion(Long productId) {
        System.out.println("Handling product deletion for product ID: " + productId);
        Page<Bid> bids = bidRepository.findByProductId(productId, null);
        if (bids.isEmpty()) {
            System.out.println("No bids found for product: " + productId);
            return;
        }

        // Close all bids related to the deleted product
        List<Bid> bidList = bids.getContent();
        for (Bid bid : bidList) {
            bid.setStatus(BidStatus.ORPHANED);
        }

        bidRepository.saveAll(bidList);
    }

    public void closeAndSelectWinner(Long productId) {
        List<Bid> bids = bidRepository.findByProductIdAndStatus(productId, BidStatus.PENDING);

        if (bids.isEmpty()) {
            System.out.println("No active bids for product: " + productId);
            return;
        }

        // Close all bids
        Bid winningBid = bids.stream()
                .max(Comparator.comparingDouble(Bid::getPrice))
                .orElse(null);

        for (Bid bid : bids) {
            if (bid.equals(winningBid)) {
                bid.setStatus(BidStatus.WINNER);
            } else {
                bid.setStatus(BidStatus.CLOSED);
            }
        }

        // Send event for the winning bid
        BidClosedEvent bidClosedEvent = new BidClosedEvent(
                productId,
                winningBid.getUserId(),
                winningBid.getId(),
                winningBid.getPrice()
        );

        System.out.println("Sending BidClosedEvent for bid ID: " + winningBid.getId());
        kafkaTemplate.send("bid-closed-topic", bidClosedEvent);
        bidRepository.saveAll(bids);
    }

    private BidDto mapToDto(Bid bid) {
        if (bid == null) {
            return null;
        }
        BidDto bidDTO = new BidDto();
        bidDTO.setId(bid.getId());
        bidDTO.setProductId(bid.getProductId());
        bidDTO.setPrice(bid.getPrice());
        bidDTO.setStatus(bid.getStatus());
        bidDTO.setCreatedAt(bid.getCreatedAt()); // Setting the created time
        bidDTO.setUpdatedAt(bid.getUpdatedAt()); // Setting the updated time
        return bidDTO;
    }

}
