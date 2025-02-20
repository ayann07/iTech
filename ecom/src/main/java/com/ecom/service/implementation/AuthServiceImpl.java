package com.ecom.service.implementation;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecom.dto.UserDto;
import com.ecom.dto.request.LoginRequestDto;
import com.ecom.dto.request.SignupRequestDto;
import com.ecom.entity.User;
import com.ecom.entity.enums.Role;
import com.ecom.exceptions.ResourceNotFoundException;
import com.ecom.repository.UserRepository;
import com.ecom.security.JwtService;
import com.ecom.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtService jwtService;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public String refreshToken(String refreshToken) {

        Long userId = jwtService.getUserIdFromToken(refreshToken);
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        String newAccessToken = jwtService.generateAccessToken(user);

        return newAccessToken;
    }

    @Override
    public UserDto signup(SignupRequestDto signupRequestDto) {

        User user = userRepository.findByEmail(signupRequestDto.getEmail()).orElse(null);

        if (user != null) {
            new RuntimeException("user already exists with email " + signupRequestDto.getEmail());
        }

        User newUser = modelMapper.map(signupRequestDto, User.class);

        newUser.setRole(Role.CUSTOMER);

        newUser.setPassword(passwordEncoder.encode(signupRequestDto.getPassword()));

        newUser = userRepository.save(newUser);

        return modelMapper.map(newUser, UserDto.class);
    }

    @Override
    public String[] login(LoginRequestDto loginRequestDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword()));

        User user = (User) authentication.getPrincipal();
        String ans[] = new String[2];
        ans[0] = jwtService.generateAccessToken(user);
        ans[1] = jwtService.generateRefreshToken(user);
        return ans;
    }

}