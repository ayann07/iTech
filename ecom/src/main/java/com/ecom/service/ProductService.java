package com.ecom.service;

import java.util.List;

import com.ecom.dto.ProductDto;
import com.ecom.dto.request.UpdateProductDtoRequest;

public interface ProductService {
    
    ProductDto addProduct(ProductDto productDto);

    ProductDto updateProductById(UpdateProductDtoRequest productDto,Long id);

    void deleteProductById(Long id);

    ProductDto getProductById(Long id);

    List<ProductDto> getAllProducts();
}