package com.reverseauction.bidservice.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidResponseDto {
    private List<BidDto> bids;
    private long totalBids;
    private int pageNo;
    private int pageSize;

    // Constructor
    public BidResponseDto(List<BidDto> bids, long totalBids, int pageNo, int pageSize) {
        this.bids = bids;
        this.totalBids = totalBids;
        this.pageNo = pageNo;
        this.pageSize = pageSize;
    }

    // Getters and setters
}