package com.hasan.productservice.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;

import com.hasan.productservice.Base.Auditable;
import com.hasan.productservice.Enum.Condition;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor 
@NoArgsConstructor
@ToString
@Entity
@Table(name = "products")
public class Product extends Auditable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name cannot be blank")
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank(message = "Description cannot be blank")
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "price", nullable = false)
    private Long price;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image", nullable = false)
    private List<String> images = new ArrayList<>();

    @Column(name = "bids_counter", nullable = false)
    private Integer bidCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "condition", nullable = false)
    private Condition condition;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @ElementCollection
    @CollectionTable(name = "product_bids", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "bid")
    private List<Long> bids;


    @Column(name = "is_closed", nullable = false)
    private boolean isClosed = false;  // New field to track if the product is closed

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(endTime);
    }

    public void close() {
        this.isClosed = true;
    }
    
}
