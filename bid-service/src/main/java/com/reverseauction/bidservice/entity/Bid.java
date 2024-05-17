package com.reverseauction.bidservice.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "bids")
@Getter
@Setter
public class Bid {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

    @NotBlank(message = "user id cannot be blank")
	@Column(nullable = false, unique = true)
	private long userId;

    @NotBlank(message = "user id cannot be blank")
	@Column(nullable = false, unique = true)
	private long productId;

    @NotBlank(message = "Price cannot be blank")
	@Column(nullable = false)
	private double price;


}
