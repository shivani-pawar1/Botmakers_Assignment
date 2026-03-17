package com.rbacproject.dto;

import org.springframework.stereotype.Component;

import com.rbacproject.entity.Role;

import lombok.Data;

@Data
public class RegisterRequest {
	
	private String name;
	private String email;
	private String password;
	private String role;

}
