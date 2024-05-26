package com.reverseauction.bidservice.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.reverseauction.bidservice.dto.BidDto;
import com.reverseauction.bidservice.entity.Bid;
import com.reverseauction.bidservice.event.BidPlacedEvent;
import com.reverseauction.bidservice.exception.BidNotFoundException;
import com.reverseauction.bidservice.repository.BidRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BidServiceImpl implements BidService {
    BidRepository bidRepository;
    private final KafkaTemplate<String, BidPlacedEvent>  kafkaTemplate;

    @Override
    public Bid getBid(Long id){
        Optional<Bid> bid = bidRepository.findById(id);
        return unwrapBid(bid, id);
    }

    @Override
    public Bid saveBid(Bid product) {
        kafkaTemplate.send("notificationTopic", new BidPlacedEvent(product.getBidNumber()));
        return bidRepository.save(product);
    }

    @Override
    public void deleteBid(Long id) {  
        bidRepository.deleteById(id);      
    }

    @Override
    public List<BidDto> getBids(int pageNo, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNo, pageSize);
        Page<Bid> products = bidRepository.findAll(pageable);
        List<Bid> listOfProduct = products.getContent();

        return listOfProduct.stream().map(p -> mapToDto(p)).collect(Collectors.toList());
    }

    // @Override
    // public Bid updateBid(Double amount, Long id, Long userId, Long productId) {
    //     Optional<Bid> bid = bidRepository.findByUserIdAndproductId(userId, productId);
    //     Bid unwrappedGrade = unwrapBid(bid, id);
    //     unwrappedGrade.setPrice(amount);
    //     return bidRepository.save(unwrappedGrade);
    // }
    

    static Bid unwrapBid(Optional<Bid> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new BidNotFoundException(id);
    }

    private BidDto mapToDto(Bid bid) {
        if (bid == null) {
            return null;
        }
        BidDto bidDTO = new BidDto();
        bidDTO.setId(bid.getId());
        bidDTO.setUserId(bid.getUserId());
        bidDTO.setProductId(bid.getProductId());
        bidDTO.setPrice(bid.getPrice());
        return bidDTO;
    }
    
}
