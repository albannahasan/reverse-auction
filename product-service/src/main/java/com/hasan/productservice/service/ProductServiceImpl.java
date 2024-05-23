package com.hasan.productservice.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hasan.productservice.Entity.Product;
import com.hasan.productservice.Exception.ProductNotFoundException;
import com.hasan.productservice.dto.ProductDto;
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
    public List<ProductDto> getProducts(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Product> products = productRepository.findAll(pageable);
        List<Product> listOfProduct = products.getContent();

        return listOfProduct.stream().map(p -> mapToDto(p)).collect(Collectors.toList());
    }

    private ProductDto mapToDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setImages(product.getImages());
        productDto.setCreatedDate(product.getCreatedDate());
        return productDto;
    }

    static Product unwrapProduct(Optional<Product> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new ProductNotFoundException(id);
    }
}
