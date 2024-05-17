package com.reverseauction.bidservice.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.reverseauction.bidservice.entity.Bid;

public interface BidRepository extends CrudRepository<Bid, Long> {

    // Optional<Bid> findByUserIdAndproductId(Long userId, Long productId);

}