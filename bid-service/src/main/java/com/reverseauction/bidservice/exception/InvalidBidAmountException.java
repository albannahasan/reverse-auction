package com.reverseauction.bidservice.exception;

public class InvalidBidAmountException extends RuntimeException {

    public InvalidBidAmountException(Long bidAmount) {
        super("The Bid amount '" + bidAmount + "' is invalid");
    }

}
