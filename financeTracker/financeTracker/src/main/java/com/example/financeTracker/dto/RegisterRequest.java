package com.example.financeTracker.dto;

import org.springframework.stereotype.Service;

@Service
public class RegisterRequest {
	
	private String fullName;

	
	private String email;
	
	private String password;

	@Override
	public String toString() {
		return "RegisterRequest [fullName=" + fullName + ", email=" + email + ", password=" + password + "]";
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	

}
