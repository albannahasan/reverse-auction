package com.hasan.productservice.repository;

import org.springframework.data.repository.CrudRepository;

import com.hasan.productservice.Entity.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {
    
}
