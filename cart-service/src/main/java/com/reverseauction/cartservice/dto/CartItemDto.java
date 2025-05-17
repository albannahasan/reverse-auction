package com.reverseauction.cartservice.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemDto {
    private long id;
    private long productId;
    private String productName;
    private int quantity;
    private double price;
    private LocalDateTime addedAt;
}
