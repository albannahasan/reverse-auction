package com.authentication.authentication.service;

import com.authentication.authentication.entity.User;

public interface UserService {
    User getUser(Long id);
    User getUser(String username);
    User saveUser(User user);
    User getUser();
}
