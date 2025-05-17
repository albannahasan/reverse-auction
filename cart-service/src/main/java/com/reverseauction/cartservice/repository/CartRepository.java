package com.reverseauction.cartservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import com.reverseauction.cartservice.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserId(Long userId);

}