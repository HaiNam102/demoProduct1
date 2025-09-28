package com.example.demo_Product_Shop.dto;

import lombok.Builder;
import lombok.Value;

import java.math.BigDecimal;

@Value
@Builder
public class ProductListDto {
    Long id;
    String name;
    String brand;
    BigDecimal price;
    BigDecimal rating;
    Integer stock;
}



