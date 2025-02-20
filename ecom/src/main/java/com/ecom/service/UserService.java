package com.ecom.service;

import com.ecom.entity.User;

public interface UserService {
    
    User getUserById(Long id);

    void makeAdmin(Long userId);
}