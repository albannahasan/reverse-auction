package com.reverseauction.bidservice.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "bids")
@Getter
@Setter
@ToString
public class Bid {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false)
	private long productId;

	@Column(nullable = false)
	private String bidNumber;

	@Column(nullable = false)
	private double price;
}
