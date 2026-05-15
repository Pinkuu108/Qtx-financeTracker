package com.example.financeTracker.controller;

import com.example.financeTracker.config.JwtPrincipal;
import com.example.financeTracker.config.JwtUtil;
import com.example.financeTracker.dto.LoginRequest;
import com.example.financeTracker.dto.LoginResponse;
import com.example.financeTracker.dto.RegisterRequest;
import com.example.financeTracker.entity.User;
import com.example.financeTracker.repository.UserRepository;
import com.example.financeTracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired private UserService userService;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        // Login is NEVER blocked — active flag does not affect authentication
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String principal = authentication.getName();
        String email     = principal.split("::")[0];
        Long userId      = Long.parseLong(principal.split("::")[1]);
        String role      = authentication.getAuthorities().iterator().next().getAuthority();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(userId, email, role);

        // active is included in response — frontend shows warning if false
        return ResponseEntity.ok(new LoginResponse(token, userId, email, role, user.getFullName(), user.isActive()));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/me")
    public ResponseEntity<String> getCurrentUser(Authentication authentication) {
        JwtPrincipal principal = (JwtPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(principal.email());
    }

    @PostMapping("/register-admin")
    public ResponseEntity<String> registerAdmin(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.registerAdmin(request));
    }
}
