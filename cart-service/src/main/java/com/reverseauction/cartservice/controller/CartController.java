package com.reverseauction.cartservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.reverseauction.cartservice.dto.CartDto;
import com.reverseauction.cartservice.entity.Cart;
import com.reverseauction.cartservice.exception.ProductNotFoundException;
import com.reverseauction.cartservice.service.CartService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/cart")
public class CartController {

    CartService cartService;

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCart(@PathVariable Long id) {
        return new ResponseEntity<>(cartService.getCart(id), HttpStatus.OK);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CartDto> createCart(@Valid @RequestBody Cart cart) {
        // TODO: process POST request
        try {
            CartDto savedCartDto = cartService.saveCart(cart);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCartDto);
        } catch (ProductNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCart(@PathVariable Long id) {
        cartService.deleteCart(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CartDto>> getCarts(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize

    ) {
        return new ResponseEntity<>(cartService.getCarts(pageNo, pageSize), HttpStatus.OK);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<String> handleProductNotFoundException(ProductNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }


}
