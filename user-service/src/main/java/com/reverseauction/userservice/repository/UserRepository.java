package com.reverseauction.userservice.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.reverseauction.userservice.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // Optional<User> findByUserIdAndproductId(Long userId, Long productId);

}