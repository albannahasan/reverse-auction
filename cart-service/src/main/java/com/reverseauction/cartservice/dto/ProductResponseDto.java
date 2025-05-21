package com.reverseauction.cartservice.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDto {
    private Long id;
    private String name;
    private String description;
    private Long price;
    private List<String> images;
    private LocalDateTime createdDate;
}
