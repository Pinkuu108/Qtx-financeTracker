package com.example.financeTracker.dto;

public class ActivationRequestDTO {

    private Long userId;
    private String message;

    public Long getUserId()              { return userId; }
    public void setUserId(Long userId)   { this.userId = userId; }

    public String getMessage()               { return message; }
    public void setMessage(String message)   { this.message = message; }
}
