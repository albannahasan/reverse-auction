package com.reverseauction.cartservice.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartPlacedEvent {
    private String cartNumber;
}
