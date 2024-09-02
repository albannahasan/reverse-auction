package com.reverseauction.bidservice.dto;

import java.time.LocalDateTime;

import com.reverseauction.bidservice.bid_enum.BidStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidDto {
    private long id;
    private long productId;
    private double price;
    private BidStatus status; // Enum field
    private LocalDateTime createdAt; // Added field
    private LocalDateTime updatedAt; // Added field

}
