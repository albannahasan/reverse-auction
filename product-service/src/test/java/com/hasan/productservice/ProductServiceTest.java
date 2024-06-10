package com.hasan.productservice;

import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Arrays;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.BeanUtils;

import com.hasan.productservice.Entity.Product;
import com.hasan.productservice.Entity.Product.ProductBuilder;
import com.hasan.productservice.dto.ProductDto;
import com.hasan.productservice.repository.ProductRepository;
import com.hasan.productservice.service.ProductServiceImpl;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;    

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    // A test method to test the create method of the EmployeeService class.
    @Test
    public void productService_CreateProduct(){

        Product product = Product.builder()
            .id(1L)
            .name("test product")
            .description("test description")
            .price(1000L)
            .images(Arrays.asList("image1.jpg", "image2.jpg"))
            .createdDate(LocalDateTime.now())
            .build();
        

        ProductDto productDto = ProductDto.builder()
            .id(1L)
            .name("test product")
            .description("test description")
            .price(1000L)
            .images(Arrays.asList("image1.jpg", "image2.jpg"))
            .createdDate(LocalDateTime.now())
            .build();


        when(productRepository.save(Mockito.any(Product.class))).thenReturn(product);

        
        ProductDto savedProduct = productService.saveProduct(productDto);
        Assertions.assertThat(savedProduct).isNotNull();

        
    }
}
