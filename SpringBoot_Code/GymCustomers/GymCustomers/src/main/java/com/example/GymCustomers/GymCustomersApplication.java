package com.example.GymCustomers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GymCustomersApplication {

	public static void main(String[] args) {
		SpringApplication.run(GymCustomersApplication.class, args);
		System.out.println("GymCustomersApplication is running!");
	}

}

//http://localhost:8080/api/v1/attendances