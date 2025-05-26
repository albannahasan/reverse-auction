package com.reverseauction.bidservice.bid_enum;

public enum BidStatus {
    PENDING,
    CLOSED, // Auction ended; bid not selected
    WINNER // The selected winning bid
}