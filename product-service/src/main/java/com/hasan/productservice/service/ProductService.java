package com.hasan.productservice.service;

import java.util.List;

import com.hasan.productservice.Entity.Product;
import com.hasan.productservice.dto.ProductDto;

public interface ProductService {
    Product getProduct(Long id);
    Product saveProduct(Product product);
    void deleteProduct(Long id);    
    List<ProductDto> getProducts(int pageNo, int pageSize);
}
