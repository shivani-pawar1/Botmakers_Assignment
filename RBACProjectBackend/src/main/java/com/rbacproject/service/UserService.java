package com.rbacproject.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rbacproject.entity.Role;
import com.rbacproject.entity.User;
import com.rbacproject.repository.RoleRepository;
import com.rbacproject.repository.UserRepository;

@Service
public class UserService {
	
	private final UserRepository ur;
	private final RoleRepository rr;
	
	public UserService(UserRepository ur, RoleRepository rr) {
		this.ur = ur;
		this.rr = rr;
	}

	public List<User> findAll(String role) {	
		List<User> users = rr.findByRole(role).getUsers();
		return users;
	}

}
