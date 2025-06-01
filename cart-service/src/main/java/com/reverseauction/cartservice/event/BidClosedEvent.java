package com.reverseauction.cartservice.event;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidClosedEvent {
    private Long productId;
    private Long userId;
    private Long winningBidId;
    private double winningAmount;

    public BidClosedEvent() {}

    public BidClosedEvent(Long productId, Long userId, Long winningBidId, double winningAmount) {
        this.productId = productId;
        this.userId = userId;
        this.winningBidId = winningBidId;
        this.winningAmount = winningAmount;
    }
}