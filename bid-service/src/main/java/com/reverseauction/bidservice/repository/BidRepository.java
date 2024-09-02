package com.reverseauction.bidservice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.reverseauction.bidservice.entity.Bid;

public interface BidRepository extends JpaRepository<Bid, Long> {

    // Optional<Bid> findByUserIdAndproductId(Long userId, Long productId);
    Page<Bid> findByProductId(Long id, PageRequest pageable);

}