package com.reverseauction.cartservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.reverseauction.cartservice.dto.CartDto;
import com.reverseauction.cartservice.dto.CartItemDto;
import com.reverseauction.cartservice.entity.Cart;
import com.reverseauction.cartservice.entity.CartItem;
import com.reverseauction.cartservice.exception.CartNotFoundException;
import com.reverseauction.cartservice.repository.CartRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

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

    @Override
    @Transactional
    public void handleBidClosed(Long productId, Long userId, Long winningBidId, double winningAmount) {
        // Fetch the cart for the user
        System.out.println("Handling bid closed event for product ID: " + productId + ", user ID: " + userId
                + ", winning bid ID: " + winningBidId + ", winning amount: " + winningAmount);

        Optional<Cart> cartOptional = cartRepository.findByUserId(userId);

        if (!cartOptional.isPresent()) {
            System.out.println("No cart found for user ID: " + userId + ", creating a new cart");
            CartDto newCart = new CartDto();
            newCart.setUserId(userId);
            newCart.setTotalPrice(winningAmount);
            newCart.setNote("Cart created for user after bid closed event");
            newCart.setItems(null);
            CartItemDto cartItem = new CartItemDto();
            cartItem.setProductId(productId);
            cartItem.setPrice(winningAmount);

            newCart.setItems(new ArrayList<>());
            newCart.getItems().add(cartItem);
            Cart cartSaved = cartRepository.save(mapToEntity(newCart));

        } else {
            System.out.println("Cart found for user ID: " + userId);
            Cart cart = cartOptional.get();

            cart.setTotalPrice(cart.getTotalPrice() + winningAmount);
            cart.setNote("Bid closed event processed, winning bid added to cart");

            CartItem cartItem = new CartItem();
            cartItem.setProductId(productId);
            cartItem.setPrice(winningAmount);
            cartItem.setCart(cart); 

            System.out.println("Adding item to cart: " + cartItem.getProductId() + " with price: " + cartItem.getPrice());
            if (cart.getItems() == null) {
                cart.setItems(new ArrayList<>());
            }
            cart.getItems().add(cartItem);
            cartRepository.save(cart);
        }
    }

    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(userId));
    }

    private CartDto mapToDto(Cart cart) {
        if (cart == null) {
            return null;
        }
        CartDto cartDTO = new CartDto();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUserId());
        cartDTO.setTotalPrice(cart.getTotalPrice());
        cartDTO.setNote(cart.getNote());
        cartDTO.setCreatedAt(cart.getCreatedAt());
        cartDTO.setUpdatedAt(cart.getUpdatedAt());
        cartDTO.setItems(cart.getItems() != null ? cart.getItems().stream()
                .map(item -> {
                    CartItemDto cartItemDto = new CartItemDto();
                    cartItemDto.setProductId(item.getProductId());
                    cartItemDto.setPrice(item.getPrice());
                    return cartItemDto;
                }).collect(Collectors.toList()) : new ArrayList<>());

        return cartDTO;
    }

    private Cart mapToEntity(CartDto cartDTO) {
        if (cartDTO == null) {
            return null;
        }
        Cart cart = new Cart();
        cart.setId(cartDTO.getId());
        cart.setUserId(cartDTO.getUserId());
        cart.setTotalPrice(cartDTO.getTotalPrice());
        cart.setNote(cartDTO.getNote());
        cart.setCreatedAt(cartDTO.getCreatedAt());
        cart.setUpdatedAt(cartDTO.getUpdatedAt());
        List<CartItem> items = cartDTO.getItems() != null
                ? cartDTO.getItems().stream().map(item -> {
                    CartItem cartItem = new CartItem();
                    cartItem.setProductId(item.getProductId());
                    cartItem.setPrice(item.getPrice());
                    cartItem.setCart(cart); // ✅ THIS IS THE MISSING LINK
                    return cartItem;
                }).collect(Collectors.toList())
                : new ArrayList<>();

        cart.setItems(items);
        return cart;
    }

}
