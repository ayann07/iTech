package com.ecom.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.dto.UserDto;
import com.ecom.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @PutMapping("/make-admin/{id}")
    public ResponseEntity<UserDto> makeAdmin(@PathVariable Long id) {
        userService.makeAdmin(id);
        return ResponseEntity.ok().build();
    }
}
