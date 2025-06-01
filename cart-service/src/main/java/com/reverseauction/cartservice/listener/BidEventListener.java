package com.reverseauction.cartservice.listener;

import org.springframework.kafka.annotation.KafkaListener;

import com.reverseauction.cartservice.event.BidClosedEvent;
import com.reverseauction.cartservice.service.CartService;

public class BidEventListener {
    private final CartService cartService;

    public BidEventListener(CartService cartService) {
        this.cartService = cartService;
    }

    @KafkaListener(topics = "bid-closed-topic", groupId = "cart-service")
    public void handleBidClosed(BidClosedEvent event) {
        System.out.println("Received bid closed event: " + event.getProductId());
        cartService.handleBidClosed(event.getProductId(), event.getUserId(), event.getWinningBidId(), event.getWinningAmount());
    }

}
