package com.ecom.service.implementation;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecom.entity.User;
import com.ecom.entity.enums.Role;
import com.ecom.exceptions.ResourceNotFoundException;
import com.ecom.repository.UserRepository;
import com.ecom.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService,UserDetailsService{

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return  userRepository.findByEmail(username).orElse(null);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user not found with id "+id));
    }

    @Override
    public void makeAdmin(Long id) {
        User user=userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user not found with id "+id));

        user.setRole(Role.ADMIN);
        userRepository.save(user);
    }
    
}