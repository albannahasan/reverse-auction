package com.hasan.productservice.service;

import java.util.List;

import com.hasan.productservice.Entity.Product;

public interface ProductService {
    Product getProduct(Long id);
    Product saveProduct(Product product);
    void deleteProduct(Long id);    
    List<Product> getProducts();
}
