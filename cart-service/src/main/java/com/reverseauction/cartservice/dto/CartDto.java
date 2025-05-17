package com.reverseauction.cartservice.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartDto {
    private long id;
    private long userId;
    private int totalQuantity;
    private double totalPrice;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<CartItemDto> items; // Optional: add if you want to include item-level detail
}