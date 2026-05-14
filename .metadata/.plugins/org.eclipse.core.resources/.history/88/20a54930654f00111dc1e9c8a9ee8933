package com.example.financeTracker.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.financeTracker.dto.LoginRequest;
import com.example.financeTracker.dto.RegisterRequest;
import com.example.financeTracker.entity.User;
import com.example.financeTracker.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email Already Exists";
        }
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        userRepository.save(user);
        return "Registration Successful";
    }

    public String login(LoginRequest request) {
    	System.out.println("Login attempt: " + request.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        System.out.println("Found: " + optionalUser.isPresent());
        if (optionalUser.isEmpty()) {
            return "User Not Found";
        }

        User user = optionalUser.get();

        if (user.getPassword().equals(request.getPassword())) {
            return "Login Success:" + user.getId();  // ← returns userId
        }

        return "Invalid Password";
    }
}