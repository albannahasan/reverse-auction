package com.hasan.productservice;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hasan.productservice.Entity.Product;
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

    @Test
    public void ProductService_GetAllProduct_ReturnsResponseDto(){
        Page<Product> products = Mockito.mock(Page.class);

        when(productRepository.findAll(Mockito.any(Pageable.class))).thenReturn(products);

        List<ProductDto> saveProduct = productService.getProducts(1,10);

        Assertions.assertThat(saveProduct).isNotNull();

    }

    @Test
    public void ProductService_FindById_ReturnProductDto() {
        Long productId = 1L;
        Product product = Product.builder()
            .id(1L)
            .name("test product")
            .description("test description")
            .price(1000L)
            .images(Arrays.asList("image1.jpg", "image2.jpg"))
            .createdDate(LocalDateTime.now())
            .build();
        when(productRepository.findById(productId)).thenReturn(Optional.ofNullable(product));

        ProductDto productReturn = productService.getProduct(productId);

        Assertions.assertThat(productReturn).isNotNull();
    }

    @Test
    public void ProductService_DeleteProductById_ReturnVoid() {
        Long productId = 1L;
        Product product = Product.builder()
            .id(1L)
            .name("test product")
            .description("test description")
            .price(1000L)
            .images(Arrays.asList("image1.jpg", "image2.jpg"))
            .createdDate(LocalDateTime.now())
            .build();

        when(productRepository.findById(productId)).thenReturn(Optional.ofNullable(product));
        doNothing().when(productRepository).delete(product);

        assertAll(() -> productService.deleteProduct(productId));
    }

}
