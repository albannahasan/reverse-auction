package com.reverseauction.bidservice.listener;

import org.springframework.kafka.annotation.KafkaListener;

import com.reverseauction.bidservice.event.ProductDeletedEvent;
import com.reverseauction.bidservice.service.BidService;

public class ProductEventListener {
        private final BidService bidService;

    public ProductEventListener(BidService bidService) {
        this.bidService = bidService;
    }

    @KafkaListener(topics = "product-deleted-topic", groupId = "bid-service")
    public void handleProductDeleted(ProductDeletedEvent event) {
        System.out.println("Received product deletion event: " + event.getProductId());
        bidService.handleProductDeletion(event.getProductId());
    }
}
