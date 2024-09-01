package com.hasan.productservice.loader;

import java.time.LocalDateTime;
import java.util.Arrays;

import org.hibernate.validator.internal.util.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.hasan.productservice.Entity.Product;
import com.hasan.productservice.Enum.Condition;
import com.hasan.productservice.repository.ProductRepository;

@Component
public class DataLoader implements ApplicationRunner {

    // private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    private final ProductRepository productRepository;

    @Autowired
    public DataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        try {
            loadProducts();
            // logger.info("Product data loaded successfully.");
        } catch (Exception e) {
            // logger.error("Failed to load product data", e);
        }
    }

    private void loadProducts() {
        LocalDateTime now = LocalDateTime.now();

        // Product expiring in 10 minutes
        Product product1 = Product.builder()
            .name("Product 1 - Expiring in 10 minutes")
            .description("This product will expire in 10 minutes.")
            .price(1000L)
            .images(Arrays.asList("image1.jpg", "image2.jpg"))
            .bidCount(0)
            .condition(Condition.POOR)
            .createdDate(now)
            .startTime(now)
            .endTime(now.plusMinutes(10))
            .bids(Arrays.asList())
            .isClosed(false)
            .build();

        // Product expiring in 1 hour
        Product product2 = Product.builder()
            .name("Product 2 - Expiring in 1 hour")
            .description("This product will expire in 1 hour.")
            .price(2000L)
            .images(Arrays.asList("image3.jpg", "image4.jpg"))
            .bidCount(0)
            .condition(Condition.USED)
            .createdDate(now)
            .startTime(now)
            .endTime(now.plusHours(1))
            .bids(Arrays.asList())
            .isClosed(false)
            .build();

        // Product expiring in 1 day
        Product product3 = Product.builder()
            .name("Product 3 - Expiring in 1 day")
            .description("This product will expire in 1 day.")
            .price(3000L)
            .images(Arrays.asList("image5.jpg", "image6.jpg"))
            .bidCount(0)
            .condition(Condition.USED)
            .createdDate(now)
            .startTime(now)
            .endTime(now.plusDays(1))
            .bids(Arrays.asList())
            .isClosed(false)
            .build();

        // Saving all products to the repository
        productRepository.saveAll(Arrays.asList(product1, product2, product3));
    }
}