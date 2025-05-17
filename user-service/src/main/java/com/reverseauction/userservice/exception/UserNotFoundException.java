package com.reverseauction.userservice.exception;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(Long id){
        super("The User id '" + id + "' does not exist in the records");
    }
    
}