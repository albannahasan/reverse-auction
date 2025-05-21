package com.reverseauction.bidservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.reverseauction.bidservice.dto.BidDto;
import com.reverseauction.bidservice.entity.Bid;
import com.reverseauction.bidservice.exception.ProductNotFoundException;
import com.reverseauction.bidservice.service.BidService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/bid")
public class bidController {

    BidService bidService;

    @GetMapping("/{id}")
    public ResponseEntity<Bid> getBid(@PathVariable Long id) {
        return new ResponseEntity<>(bidService.getBid(id), HttpStatus.OK);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Bid> createBid(@Valid @RequestBody Bid bid) {
        Bid createdBid = bidService.saveBid(bid).block();
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBid);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBid(@PathVariable Long id) {
        bidService.deleteBid(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BidDto>> getBids(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize

    ) {
        return new ResponseEntity<>(bidService.getBids(pageNo, pageSize), HttpStatus.OK);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<String> handleProductNotFoundException(ProductNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @GetMapping("/by-product/{id}")
    public ResponseEntity<List<BidDto>> getBidsByProductId(
            @PathVariable Long id,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "latestOnly", defaultValue = "false", required = false) boolean latestOnly) {

        List<BidDto> bids = bidService.getBidsByProductId(id, pageNo, pageSize, latestOnly);
        return ResponseEntity.ok(bids);
    }

}
