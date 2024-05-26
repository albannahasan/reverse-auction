package com.reverseauction.notification_service;

import lombok.extern.slf4j.slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotificationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationServiceApplication.class, args);
	}

	@KafkaListener(topics = "notificationTopic")
	public void handleNotification(BidPlacedEvent bidPlacedEvent){
		// Send out an email notification
		log.info("Received Notification for Order - {}", bidPlacedEvent.getBidNumber());

	}

}
