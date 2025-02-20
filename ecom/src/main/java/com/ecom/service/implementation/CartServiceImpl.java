package com.ecom.service.implementation;

import java.math.BigDecimal;
import java.util.ArrayList;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ecom.dto.cart.CartDto;
import com.ecom.dto.request.CartItemAddRequest;
import com.ecom.entity.Cart;
import com.ecom.entity.CartItem;
import com.ecom.entity.Product;
import com.ecom.entity.User;
import com.ecom.exceptions.ResourceNotFoundException;
import com.ecom.repository.CartItemRepository;
import com.ecom.repository.CartRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.service.CartService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final CartItemRepository cartItemRepository;

    @Override
    public CartDto getUserCart() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new ResourceNotFoundException("No cart found!"));
        return modelMapper.map(cart, CartDto.class);
    }

    @Override
    public void removeCart() {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new ResourceNotFoundException("No cart found!"));
        cartRepository.delete(cart);
    }

    @Override
    public void removeItem(Long productId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new ResourceNotFoundException("Cart not found!"));

        CartItem item = cart.getCartItems()
                .stream()
                .filter(it -> it.getProduct().getId().equals(productId))
                .findFirst().orElseThrow(() -> new ResourceNotFoundException("item not present in cart"));

        cart.getCartItems().remove(item);
        cart.setTotalPrice(cart.getCartItems()
                .stream()
                .map(CartItem::getSubprice)
                .reduce(BigDecimal.ZERO, BigDecimal::add));
        cartRepository.save(cart);
    }

    @Override
    public CartDto incrementItem(Long productId) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        CartItem item = cart.getCartItems().stream()
                .filter(it -> it.getProduct().getId().equals(productId))
                .findFirst().orElseThrow(() -> new ResourceNotFoundException("item not found!"));

        item.setQuantity(item.getQuantity() + 1);
        item.setSubprice(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));

        cart.setTotalPrice(cart.getCartItems().stream()
                .map(CartItem::getSubprice)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        Cart updatedCart = cartRepository.save(cart);

        return modelMapper.map(updatedCart, CartDto.class);

    }

    @Override
    public CartDto decrementItem(Long productId) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new ResourceNotFoundException("Cart not found!"));

        CartItem item = cart.getCartItems().stream()
                .filter(it -> it.getProduct().getId().equals(productId))
                .findFirst().orElseThrow(() -> new ResourceNotFoundException("Item not present in cart"));

        if (item.getQuantity() == 1) {
            cart.getCartItems().remove(item);
        } else {
            item.setQuantity(item.getQuantity() - 1);
            item.setSubprice(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        cart.setTotalPrice(cart.getCartItems().stream()
                .map(CartItem::getSubprice)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        Cart updatedCart = cartRepository.save(cart);

        return modelMapper.map(updatedCart, CartDto.class);
    }

    @Override
    @Transactional
    public CartDto addItem(CartItemAddRequest cartItemAddRequest) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
            Cart itx = new Cart();
            itx.setCartItems(new ArrayList<>());
            itx.setTotalPrice(BigDecimal.ZERO);
            itx.setUser(user);
            return cartRepository.save(itx);
        });

        Product product=productRepository.findById(cartItemAddRequest.getProductId()).orElseThrow(()->new ResourceNotFoundException("No product found with id "+cartItemAddRequest.getProductId()));

        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product).orElse(null);

        if (cartItem != null) {
            // Update quantity and price if item exists
            cartItem.setQuantity(cartItem.getQuantity() + cartItemAddRequest.getQuantity());
            cartItem.setSubprice(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        } 
        else {
            // Add new item if not found
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(cartItemAddRequest.getQuantity());
            cartItem.setSubprice(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            cart.getCartItems().add(cartItem);
        }
        // Save cart item
        cartItemRepository.save(cartItem);

        // Update total cart price
        cart.setTotalPrice(cart.getCartItems().stream()
                .map(CartItem::getSubprice)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        // Save updated cart
        cartRepository.save(cart);

        return modelMapper.map(cart, CartDto.class);

    }

}