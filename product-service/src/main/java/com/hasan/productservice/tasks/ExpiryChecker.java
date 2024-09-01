package com.hasan.productservice.tasks;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import com.hasan.productservice.Entity.Product;


public class ExpiryChecker {
    private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public void startChecking(long interval, TimeUnit unit, List<Product> products) {
        scheduler.scheduleAtFixedRate(() -> {
            for (Product product : products) {
                if (product.isExpired()) {
                    System.out.println(product.getName() + " has expired.");
                    // You can add more logic here, like removing the item or notifying someone
                }
            }
        }, 0, interval, unit);
    }

    public void stopChecking() {
        scheduler.shutdown();
    }
}
