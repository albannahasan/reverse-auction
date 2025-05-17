package com.reverseauction.cartservice.exception;

public class CartNotFoundException extends RuntimeException{

    public CartNotFoundException(Long id){
        super("The cart id '" + id + "' does not exist in the records");
    }
    
}