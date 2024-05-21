package com.reverseauction.bidservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.reverseauction.bidservice.entity.Bid;
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
        //TODO: process POST request
        return new ResponseEntity<>(bidService.saveBid(bid), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBid(@PathVariable Long id) {
        bidService.deleteBid(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Bid>> getBids() {
        return new ResponseEntity<>(bidService.getBids(), HttpStatus.OK);
    }
}
