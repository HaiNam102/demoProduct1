package com.example.demo_Product_Shop.service;

import com.example.demo_Product_Shop.dto.ProductDto;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.demo_Product_Shop.dto.ProductListDto;

public interface ProductService {
//    List<ProductDto> getAllProducts();
    Page<ProductListDto> getProducts(Pageable pageable);
    ProductDto getProductById(Long id);
    Page<ProductListDto> getProductsByCategoryId(Long categoryId, Pageable pageable);
}


