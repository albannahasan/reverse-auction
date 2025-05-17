package com.reverseauction.cartservice.service;

import java.util.List;

import com.reverseauction.cartservice.dto.CartDto;
import com.reverseauction.cartservice.entity.Cart;

import reactor.core.publisher.Mono;

public interface CartService {
    Cart getCart(Long id);
    CartDto saveCart(Cart cart);
    void deleteCart(Long id);    
    // Cart updateCart(Double amount, Long id, Long userId, Long productId);
    List<CartDto> getCarts(int pageNo, int pageSize);
}