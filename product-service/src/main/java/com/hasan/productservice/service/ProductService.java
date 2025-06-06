package com.hasan.productservice.service;

import java.util.List;


import com.hasan.productservice.Entity.Product;
import com.hasan.productservice.dto.ProductDto;
import com.hasan.productservice.dto.ProductPageResponse;

public interface ProductService {
    ProductDto getProduct(Long id);
    ProductDto saveProduct(ProductDto product);
    void deleteProduct(Long id);    
    ProductDto updateProduct(Long id, Product produc);
    ProductPageResponse getProducts(int pageNo, int pageSize);
    void closeAndSelectWinners();
    List<ProductDto> getProductsByIds(List<Long> productIds);
}
