package com.example.demo_Product_Shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
//@EnableCaching
public class DemoProductShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoProductShopApplication.class, args);
	}

}
