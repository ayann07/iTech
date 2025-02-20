package com.ecom.service;

import com.ecom.dto.UserDto;
import com.ecom.dto.request.LoginRequestDto;
import com.ecom.dto.request.SignupRequestDto;

public interface AuthService {

    public String refreshToken(String refreshToken);

    public UserDto signup(SignupRequestDto signupRequestDto);

    public String[] login(LoginRequestDto loginRequestDto);
}