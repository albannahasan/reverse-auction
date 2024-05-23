package com.hasan.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hasan.productservice.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
