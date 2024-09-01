package com.hasan.productservice.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hasan.productservice.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
        List<Product> findByIsClosedFalseAndEndTimeBefore(LocalDateTime endTime);

}
