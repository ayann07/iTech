package com.ecom.controllers;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.dto.UserDto;
import com.ecom.dto.request.LoginRequestDto;
import com.ecom.dto.request.LoginResponseDto;
import com.ecom.dto.request.RefreshResponseDto;
import com.ecom.dto.request.SignupRequestDto;
import com.ecom.entity.User;
import com.ecom.exceptions.ResourceNotFoundException;
import com.ecom.repository.UserRepository;
import com.ecom.service.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(@RequestBody SignupRequestDto signupRequestDto) {
        return new ResponseEntity<>(authService.signup(signupRequestDto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto,
            HttpServletResponse httpServletResponse) {
        String[] tokens = authService.login(loginRequestDto);
        User user=userRepository.findByEmail(loginRequestDto.getEmail()).orElseThrow(()-> new ResourceNotFoundException("user not found!"));

        Cookie cookie = new Cookie("refreshToken", tokens[1]);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(1000 * 60 * 60 * 24 * 30 * 6);
        httpServletResponse.addCookie(cookie);

        return ResponseEntity.ok(new LoginResponseDto(tokens[0],user.getRole().name()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshResponseDto> refresh(HttpServletRequest request) {
        String refreshToken = Arrays.stream(request.getCookies())
                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElseThrow(() -> new RuntimeException("No cookie found!"));
        String accessToken = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(new RefreshResponseDto(accessToken));
    }

}