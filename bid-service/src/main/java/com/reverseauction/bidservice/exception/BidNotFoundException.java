package com.reverseauction.bidservice.exception;

public class BidNotFoundException extends RuntimeException{

    public BidNotFoundException(Long id){
        super("The Bid id '" + id + "' does not exist in the records");
    }
    
}