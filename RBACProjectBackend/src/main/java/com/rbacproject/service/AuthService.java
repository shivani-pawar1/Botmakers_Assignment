package com.rbacproject.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rbacproject.config.JWTUtil;
import com.rbacproject.dto.LoginRequest;
import com.rbacproject.dto.RegisterRequest;
import com.rbacproject.entity.Role;
import com.rbacproject.entity.User;
import com.rbacproject.repository.RoleRepository;
import com.rbacproject.repository.UserRepository;

@Service
public class AuthService {

	private final UserRepository ur;
	private final RoleRepository rr;
	 private final JWTUtil jwtUtil;
	 private  final PasswordEncoder passwordEncoder;
	
	public AuthService(UserRepository ur,RoleRepository rr, JWTUtil jwtUtil, PasswordEncoder passwordEncoder) {
		this.ur = ur;
		this.rr = rr;
		 this.jwtUtil = jwtUtil;
		 this.passwordEncoder = passwordEncoder;
		 
	}
	
	public boolean register(RegisterRequest registerRequest) throws Exception {
		
		Optional<User> user = ur.findByEmail(registerRequest.getEmail());

		System.err.println(registerRequest);
		
		if(user.isPresent()) {
		    throw new Exception("User already exists");
		 }
		
		Role role = rr.findByRole(registerRequest.getRole());
		if(role == null) {
			throw new Exception("Role not found");
		}
		
		User u1 = new User();
		u1.setName(registerRequest.getName());
		u1.setEmail(registerRequest.getEmail());
			
	    System.out.println(role);
		u1.setRole(role);
			
		u1.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

		ur.save(u1);
		
		return true;
	}

	public String login(LoginRequest loginRequest) throws Exception {
		
		Optional<User> u1 = ur.findByEmail(loginRequest.getEmail());
		
		if(u1.isPresent()) {
			
			User orgUser = u1.get();
			
			if(passwordEncoder.matches(loginRequest.getPassword(), orgUser.getPassword())) {
			  String token = jwtUtil.generateToken(orgUser.getEmail());
			  return token;
			}
			else {
				
				throw new Exception("Invalied User");
			}
			
		}
		else {
			throw new Exception("User Note Found");
		}
	}

	public String getRole(String email) throws Exception {
		Optional<User> u1 = ur.findByEmail(email);
		
		if(u1.isPresent()) {
			User user = u1.get();
			return user.getRole().getRole();
		}
		
		throw new Exception("User not found");
	}

}
