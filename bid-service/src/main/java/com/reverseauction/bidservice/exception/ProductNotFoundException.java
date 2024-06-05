package com.reverseauction.bidservice.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id){
        super("The product id '" + id + "' does not exist in the records");
    }

}
