package com.reverseauction.authservice.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

import com.reverseauction.authservice.entity.User;

public interface UserRepository  extends CrudRepository<User, Long> {   
    Optional<User> findByUsername(String username);
}