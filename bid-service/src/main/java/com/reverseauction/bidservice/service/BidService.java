package com.reverseauction.bidservice.service;

import java.util.List;

import com.reverseauction.bidservice.entity.Bid;

public interface BidService {
    Bid getBid(Long id);
    Bid saveBid(Bid bid);
    void deleteBid(Long id);    
    Bid updateBid(Double amount, Long id, Long userId, Long productId);
    List<Bid> getBids();
}