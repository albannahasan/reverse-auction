package com.hasan.productservice.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.hasan.productservice.Enum.Condition;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor 
@NoArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Long price;
    private List<String> images;
    private Condition condition;
    private LocalDateTime createdDate;
    private List<BidDto> bids;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean isClosed;
}
