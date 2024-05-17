package com.reverseauction.bidservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.reverseauction.bidservice.entity.Bid;
import com.reverseauction.bidservice.exception.BidNotFoundException;
import com.reverseauction.bidservice.repository.BidRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BidServiceImpl implements BidService {
    BidRepository bidRepository;

    @Override
    public Bid getBid(Long id){
        Optional<Bid> bid = bidRepository.findById(id);
        return unwrapBid(bid, id);
    }

    @Override
    public Bid saveBid(Bid product) {
        return bidRepository.save(product);
    }

    @Override
    public void deleteBid(Long id) {  
        bidRepository.deleteById(id);      
    }

    @Override
    public List<Bid> getBids() {
        return (List<Bid>)bidRepository.findAll();
    }

    // @Override
    // public Bid updateBid(Double amount, Long id, Long userId, Long productId) {
    //     Optional<Bid> bid = bidRepository.findByUserIdAndproductId(userId, productId);
    //     Bid unwrappedGrade = unwrapBid(bid, id);
    //     unwrappedGrade.setPrice(amount);
    //     return bidRepository.save(unwrappedGrade);
    // }

    static Bid unwrapBid(Optional<Bid> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new BidNotFoundException(id);
    }
    
}
