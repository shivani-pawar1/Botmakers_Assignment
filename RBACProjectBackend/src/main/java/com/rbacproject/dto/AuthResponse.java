package com.rbacproject.dto;

import com.rbacproject.entity.Role;

import lombok.Data;

@Data
public class AuthResponse {

    private String token;
    private String role;

    public AuthResponse(String token, String role){
        this.token=token;
        this.role=role;
    }
}