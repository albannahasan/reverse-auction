package com.hasan.productservice.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BidDto {
    private long id;
    private long productId;
    private double price;
	private String bidNumber;

}
