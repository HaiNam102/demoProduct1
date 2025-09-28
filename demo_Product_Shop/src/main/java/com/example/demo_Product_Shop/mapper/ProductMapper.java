package com.example.demo_Product_Shop.mapper;

import com.example.demo_Product_Shop.dto.ProductDto;
import com.example.demo_Product_Shop.dto.ProductListDto;
import com.example.demo_Product_Shop.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ProductMapper {
    ProductDto toDetailDto(Product product);
    @Mapping(source = "stock",target = "stock")
    ProductListDto toListDto(Product product);
}



