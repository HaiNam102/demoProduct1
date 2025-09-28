package com.example.demo_Product_Shop.dto;

import lombok.Builder;
import lombok.Value;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Value
@Builder
public class ProductDto {
    Long id;
    String name;
    String brand;
    String description;
    BigDecimal price;
    Integer stock;
    Integer sold;
    BigDecimal rating;
    LocalDateTime createdAt;
}


