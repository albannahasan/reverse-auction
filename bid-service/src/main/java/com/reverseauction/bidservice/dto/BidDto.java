package com.reverseauction.bidservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidDto {
    private long id;
    private long userId;
    private long productId;
    private double price;
}
