package com.example.demo_Product_Shop.service.impl;

import com.example.demo_Product_Shop.dto.ProductDto;
import com.example.demo_Product_Shop.dto.ProductListDto;
import com.example.demo_Product_Shop.mapper.ProductMapper;
import com.example.demo_Product_Shop.repository.ProductRepository;
import com.example.demo_Product_Shop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

//    @Override
//    public List<ProductDto> getAllProducts() {
//        return productRepository.findAll().stream()
//                .map(ProductMapper::toDetailDto)
//                .toList();
//    }

    @Override
    public Page<ProductListDto> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(productMapper::toListDto);
    }

    @Override
    public ProductDto getProductById(Long id) {
        return productMapper.toDetailDto(
                productRepository.findById(id)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "product not found"))
        );
    }

    @Override
    public Page<ProductListDto> getProductsByCategoryId(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryId(categoryId, pageable).map(productMapper::toListDto);
    }

}


