package com.reverseauction.bidservice.entity;


import java.time.LocalDateTime;

import com.reverseauction.bidservice.bid_enum.BidStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
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
	private double price;

	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@Column(nullable = false)
	private LocalDateTime updatedAt;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private BidStatus status = BidStatus.PENDING;

	@PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
		updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
