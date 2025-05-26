package com.reverseauction.bidservice.service;

import java.util.List;

import com.reverseauction.bidservice.dto.BidDto;
import com.reverseauction.bidservice.dto.BidResponseDto;
import com.reverseauction.bidservice.entity.Bid;

import reactor.core.publisher.Mono;

public interface BidService {
    Bid getBid(Long id);
    Mono<Bid> saveBid(Bid bid);
    void deleteBid(Long id);    
    // Bid updateBid(Double amount, Long id, Long userId, Long productId);
    List<BidDto> getBids(int pageNo, int pageSize);
    BidResponseDto getBidsByProductId(Long id, int pageNo, int pageSize, boolean latestOnly);
    void closeAndSelectWinner(Long productId);
}