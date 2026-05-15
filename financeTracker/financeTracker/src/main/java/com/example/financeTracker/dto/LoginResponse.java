package com.example.financeTracker.dto;

public class LoginResponse {

    private String token;
    private Long userId;
    private String email;
    private String role;
    private String fullName;
    private boolean active;

    public LoginResponse(String token, Long userId, String email, String role, String fullName, boolean active) {
        this.token    = token;
        this.userId   = userId;
        this.email    = email;
        this.role     = role;
        this.fullName = fullName;
        this.active   = active;
    }

    public String getToken()    { return token; }
    public Long getUserId()     { return userId; }
    public String getEmail()    { return email; }
    public String getRole()     { return role; }
    public String getFullName() { return fullName; }
    public boolean isActive()   { return active; }
}
