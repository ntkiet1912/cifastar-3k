package com.theatermgnt.theatermgnt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TheatermgntApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheatermgntApplication.class, args);
        System.out.println("Cinema Management API is running on https://localhost:8080");

	}

}
