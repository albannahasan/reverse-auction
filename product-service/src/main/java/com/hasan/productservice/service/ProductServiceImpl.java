package com.hasan.productservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hasan.productservice.Entity.Product;
import com.hasan.productservice.Exception.ProductNotFoundException;
import com.hasan.productservice.repository.ProductRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {
    ProductRepository productRepository;

    @Override
    public Product getProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return unwrapProduct(product, id);
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {  
        productRepository.deleteById(id);      
    }

    @Override
    public List<Product> getProducts() {
        return (List<Product>)productRepository.findAll();
    }

    static Product unwrapProduct(Optional<Product> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new ProductNotFoundException(id);
    }
}
