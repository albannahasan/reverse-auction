package com.reverseauction.cartservice.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.reverseauction.cartservice.dto.CartDto;
import com.reverseauction.cartservice.dto.ProductResponseDto;
import com.reverseauction.cartservice.entity.Cart;
import com.reverseauction.cartservice.exception.CartNotFoundException;
import com.reverseauction.cartservice.exception.ProductNotFoundException;
import com.reverseauction.cartservice.repository.CartRepository;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;

@AllArgsConstructor
@Service
public class CartServiceImpl implements CartService {
    CartRepository cartRepository;

    @Override
    public Cart getCart(Long id) {
        Optional<Cart> cart = cartRepository.findById(id);
        if (!cart.isPresent()) {
            throw new CartNotFoundException(id);
        }

        return unwrapCart(cart, id);
    }

    @Override
    public CartDto saveCart(Cart cart) {
        Optional<Cart> existingCart = cartRepository.findByUserId(cart.getUserId());

        if (existingCart.isPresent()) {
            return mapToDto(existingCart.get()); // Return the existing cart instead of creating a new one
        }

        return mapToDto(cartRepository.save(cart)); // Save and return the new cart
    }

    @Override
    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }

    @Override
    public List<CartDto> getCarts(int pageNo, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNo, pageSize);
        Page<Cart> carts = cartRepository.findAll(pageable);
        List<Cart> listOfCarts = carts.getContent();

        return listOfCarts.stream().map(p -> mapToDto(p)).collect(Collectors.toList());
    }


    static Cart unwrapCart(Optional<Cart> entity, Long id) {
        if (entity.isPresent())
            return entity.get();
        else
            throw new CartNotFoundException(id);
    }

    private CartDto mapToDto(Cart cart) {
        if (cart == null) {
            return null;
        }
        CartDto cartDTO = new CartDto();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUserId());
        cartDTO.setTotalQuantity(cart.getTotalQuantity());
        cartDTO.setTotalPrice(cart.getTotalPrice());
        cartDTO.setNote(cart.getNote());
        cartDTO.setCreatedAt(cart.getCreatedAt());
        cartDTO.setUpdatedAt(cart.getUpdatedAt());

        return cartDTO;
    }

}
