package com.hasan.productservice.tasks;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import com.hasan.productservice.Entity.Product;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ExpiryChecker {

    @Value("${bid.service.url}")
    private String BID_SERVICE_URL;

    private final RestTemplate restTemplate;

    private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public ExpiryChecker(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void startChecking(long interval, TimeUnit unit, List<Product> products) {
        scheduler.scheduleAtFixedRate(() -> {
            for (Product product : products) {
                if (product.isExpired()) {
                    System.out.println(product.getName() + " has expired.");
                    // You can add more logic here, like removing the item or notifying someone

                    try {
                        String url = BID_SERVICE_URL + "/bids/close-and-select-winner/" + product.getId();
                        restTemplate.postForEntity(url, null, Void.class);
                        System.out.println(
                                "Notified Bid Service to close and select winner for product: " + product.getId());
                    } catch (Exception e) {
                        System.err.println("Failed to notify Bid Service: " + e.getMessage());
                    }
                }
            }
        }, 0, interval, unit);
    }

    public void stopChecking() {
        scheduler.shutdown();
    }
}
