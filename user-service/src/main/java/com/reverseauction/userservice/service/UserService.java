package com.reverseauction.userservice.service;

import java.util.List;

import com.reverseauction.userservice.dto.UserDto;
import com.reverseauction.userservice.entity.User;

public interface UserService {
    User getUser(Long id);
    User saveUser(User user);
    void deleteUser(Long id);    
    // User updateUser(Double amount, Long id, Long userId, Long productId);
    List<UserDto> getUsers(int pageNo, int pageSize);

}