package com.reverseauction.bidservice.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BidPlacedEvent {
    private String bidNumber;
}
