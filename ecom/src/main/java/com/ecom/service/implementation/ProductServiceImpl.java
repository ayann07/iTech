package com.ecom.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ecom.dto.ProductDto;
import com.ecom.dto.request.UpdateProductDtoRequest;
import com.ecom.entity.Product;
import com.ecom.entity.User;
import com.ecom.exceptions.ResourceNotFoundException;
import com.ecom.repository.ProductRepository;
import com.ecom.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;

    @Override
    public ProductDto addProduct(ProductDto productDto) {

        Product product = modelMapper.map(productDto, Product.class);

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        product.setOwner(user);

        product = productRepository.save(product);

        return modelMapper.map(product, ProductDto.class);
    }

    @Override
    public ProductDto updateProductById(UpdateProductDtoRequest productDto, Long id) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product does not exist with id " + id));

        if (productDto.getName() != null)
            existingProduct.setName(productDto.getName());

        if (productDto.getDescription() != null)
            existingProduct.setDescription(productDto.getDescription());

        if (productDto.getPrice() != null)
            existingProduct.setPrice(productDto.getPrice());

        if (productDto.getStock() != null)
            existingProduct.setStock(productDto.getStock());

        if (productDto.getImages() != null && productDto.getImages().length > 0) {
            existingProduct.setImages(productDto.getImages());
        }
        Product updatedProduct = productRepository.save(existingProduct);

        return modelMapper.map(updatedProduct, ProductDto.class);
    }

    @Override
    public void deleteProductById(Long id) {

        if (!productRepository.existsById(id))
            new ResourceNotFoundException("Product not found with id " + id);

        productRepository.deleteById(id);
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

        return modelMapper.map(product, ProductDto.class);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
    }

}