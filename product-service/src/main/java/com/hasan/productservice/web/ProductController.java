package com.hasan.productservice.web;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hasan.productservice.Entity.Product;
import com.hasan.productservice.Exception.ProductNotFoundException;
import com.hasan.productservice.dto.BidDto;
import com.hasan.productservice.dto.ProductDto;
import com.hasan.productservice.service.ProductService;
import com.hasan.productservice.service.ProductServiceImpl;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@AllArgsConstructor
@RestController
@RequestMapping("/product")

public class ProductController {

    private final WebClient webClient;

    @Autowired
    ProductService productService;

    @Autowired
    ProductServiceImpl productServiceImpl;

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        return new ResponseEntity<>(productService.getProduct(id), HttpStatus.OK);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @CircuitBreaker(name = "bid", fallbackMethod = "fallbackMethod")
    // @TimeLimiter(name = "bid")
    // @Retry(name = "bid")
    public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody ProductDto product) {
        ObjectMapper objectMapper = new ObjectMapper();

    List<BidDto> bidToSave = product.getBids();
    product.setBids(Collections.emptyList());

    // Step 1: Save the product without bids
    ProductDto createdProduct = productService.saveProduct(product);
    Long productId = createdProduct.getId();

    if (bidToSave != null && !bidToSave.isEmpty()) {
        List<Long> bids = new ArrayList<>();

        // Create Flux from the list of bids
        Flux<String> responseFlux = Flux.fromIterable(bidToSave)
                .flatMap(bid -> {
                    bid.setProductId(productId); // Set productId for each bid
                    // Call WebClient and return a Mono<String>
                    return webClient.post()
                            .uri("http://localhost:8085/bid")
                            .body(BodyInserters.fromValue(bid))
                            .retrieve()
                            .bodyToMono(String.class);
                });

        // Block and wait for all responses
        List<String> responses = responseFlux.collectList().block();

        if (responses != null) {
            for (String response : responses) {
                try {
                    JsonNode jsonNode = objectMapper.readTree(response);
                    int id = jsonNode.get("id").asInt();
                    Long idLong = (long) id;
                    bids.add(idLong);
                } catch (Exception e) {
                    System.err.println("Failed to parse JSON response: " + e.getMessage());
                }
            }
        }

        // Step 2: Update product with bids
        Product productEntity = ProductServiceImpl.mapToEntity(createdProduct);
        productEntity.setBids(new ArrayList<>(bids)); // Defensive copy
        createdProduct = productService.updateProduct(productId, productEntity);
    }

    return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> getProducts(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize

    ) {
        return new ResponseEntity<>(productService.getProducts(pageNo, pageSize), HttpStatus.OK);
    }

    public CompletableFuture<String> fallbackMethod(Product product, RuntimeException runtimeException) {
        return CompletableFuture
                .supplyAsync(() -> "Oops! Something went wrong, please resend request after some time!");

    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<String> handleProductNotFoundException(ProductNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
