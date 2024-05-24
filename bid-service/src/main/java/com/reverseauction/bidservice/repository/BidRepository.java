package com.reverseauction.bidservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reverseauction.bidservice.entity.Bid;

public interface BidRepository extends JpaRepository<Bid, Long> {

    // Optional<Bid> findByUserIdAndproductId(Long userId, Long productId);

}