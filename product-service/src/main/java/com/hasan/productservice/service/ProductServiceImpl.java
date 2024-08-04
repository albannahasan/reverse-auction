package com.hasan.productservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.hasan.productservice.Entity.Product;
import com.hasan.productservice.Exception.ProductNotFoundException;
import com.hasan.productservice.dto.BidDto;
import com.hasan.productservice.dto.ProductDto;
import com.hasan.productservice.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;

@AllArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {
    ProductRepository productRepository;
    private final WebClient webClient;

    @Override
    public ProductDto getProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (!product.isPresent()) {
            throw new ProductNotFoundException(id);
        }
   
        Product unwrappedProduct = unwrapProduct(product, id);

        ProductDto productResult = mapToDto(unwrappedProduct);
        
        return productResult;

    }

    @Override
    public ProductDto saveProduct(ProductDto productDto) {
        Product product = mapToEntity(productDto);
        product.setBidCount(0);
        return mapToDto(productRepository.save(product));
    }

    @Override
    public ProductDto updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + id));
    
        // Update fields of the existing product
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setBidCount(product.getBidCount());
        existingProduct.setCondition(product.getCondition());
        existingProduct.setCreatedDate(product.getCreatedDate());
        existingProduct.setImages(new ArrayList<>(product.getImages())); // Defensive copy for images
        existingProduct.setBids(new ArrayList<>(product.getBids())); // Defensive copy for bids
    
    
        // Save the updated product
        Product updatedProduct = productRepository.save(existingProduct);
        ProductDto result = mapToDto(updatedProduct);

    
        return result;
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductDto> getProducts(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Product> products = productRepository.findAll(pageable);
        List<Product> listOfProduct = products.getContent();
        return listOfProduct.stream().map(p -> mapToDto(p)).collect(Collectors.toList());
    }

    public static Product mapToEntity(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setImages(productDto.getImages());
        product.setCreatedDate(productDto.getCreatedDate());
        product.setCondition(productDto.getCondition());
        if (productDto.getImages() != null) {
            product.setImages(new ArrayList<>(productDto.getImages()));
        }
        return product;
    }

    private ProductDto mapToDto(Product product) {
        ProductDto productDto = new ProductDto();

        if (product.getBids() != null) {
            
            List<BidDto> bidList = getBidsFromBidService(product.getBids());
            productDto.setBids(bidList);
        }


        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setImages(product.getImages());
        productDto.setCreatedDate(product.getCreatedDate());
        productDto.setCondition(product.getCondition());
        return productDto;
    }

    static Product unwrapProduct(Optional<Product> entity, Long id) {
        if (entity.isPresent())
            return entity.get();
        else
            throw new ProductNotFoundException(id);
    }

    private List<BidDto> getBidsFromBidService(List<Long> ids) {
        ObjectMapper objectMapper = new ObjectMapper();

        List<BidDto> result = new ArrayList<>();

        Flux<String> responseFlux = Flux.fromIterable(ids)
                .flatMap(id -> {
                    // Call WebClient and return a Mono<String>
                    String uriTemplate = "http://localhost:8085/bid/{id}";
                    return webClient.get()
                            .uri(uriTemplate, id)
                            .retrieve()
                            .bodyToMono(String.class);
                });

                List<String> responses = responseFlux
                .collectList()
                .block(); // Block until all responses are collected
    
        if (responses != null) {
            for (String response : responses) {
                try {
                    JsonNode jsonNode = objectMapper.readTree(response);
    
                    BidDto bidEntry = new BidDto();
                    Long bidId = jsonNode.get("id").asLong();
                    Long productId = jsonNode.get("productId").asLong();
                    String bidNumber = jsonNode.get("bidNumber").asText();
                    Double price = jsonNode.get("price").asDouble(); // Correct field name to 'price'
    
                    bidEntry.setBidNumber(bidNumber);
                    bidEntry.setId(bidId);
                    bidEntry.setProductId(productId);
                    bidEntry.setPrice(price);
    
                    result.add(bidEntry);
                } catch (Exception e) {
                    System.err.println("Failed to parse JSON response: " + e.getMessage());
                }
            }
        }
        return result;

    }

}
