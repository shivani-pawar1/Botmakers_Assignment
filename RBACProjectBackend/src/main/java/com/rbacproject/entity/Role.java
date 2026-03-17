package com.rbacproject.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String role;
	
    @OneToMany(mappedBy = "role")
    private List<User> users;

    @Override
    public String toString() {
        return "Role [id=" + id + ", role=" + role + "]";
    }
}
