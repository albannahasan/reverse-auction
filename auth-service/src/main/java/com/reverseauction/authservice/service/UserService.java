package com.reverseauction.authservice.service;
import com.reverseauction.authservice.entity.User;

public interface UserService {
    User getUser(Long id);
    User getUser(String username);
    User saveUser(User user);

}
