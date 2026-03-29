package com.rbacproject.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rbacproject.config.JWTUtil;
import com.rbacproject.dto.AuthResponse;
import com.rbacproject.dto.LoginRequest;
import com.rbacproject.dto.RegisterRequest;
import com.rbacproject.service.AuthService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173/")
public class AuthController {

     private final AuthService as;
     
     public AuthController(AuthService as, JWTUtil jwtUtil ){
    	 this.as = as;	
     }
     
     @PostMapping("/register")
     public boolean register(@RequestBody RegisterRequest registerRequest) throws Exception {
    	 return as.register(registerRequest);
     }
     
     @PostMapping("/login")
     public AuthResponse login(@RequestBody LoginRequest loginRequest) throws Exception {
    	 
    	 String token =  as.login(loginRequest);
    	 String role = as.getRole(loginRequest.getEmail());
    	 
    	 return new AuthResponse(token, role);
     }
     
}
