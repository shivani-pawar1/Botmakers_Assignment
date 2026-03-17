












package com.rbacproject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	private String email;
	private String password;	

	@ManyToOne
    @JoinColumn(name = "role_id") 
    private Role role;
	
	@Override
	public String toString() {
	    return "User [id=" + id + ", name=" + name + ", email=" + email + "]";
	}

}
