package com.rbacproject.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rbacproject.entity.User;
import com.rbacproject.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173/")
public class UserController {
	
	private final UserService us;

	public UserController(UserService us) {
		this.us = us;
	}

	@GetMapping("/allUsers")
	public List<User> findAll(@RequestParam String role){
		System.err.println(role);
		return us.findAll(role);
	}
}
