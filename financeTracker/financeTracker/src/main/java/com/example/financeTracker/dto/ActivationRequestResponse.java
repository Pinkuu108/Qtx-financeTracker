package com.example.financeTracker.dto;

import java.time.LocalDateTime;

public class ActivationRequestResponse {

    private Long id;
    private Long userId;
    private String userEmail;
    private String userFullName;
    private String message;
    private String status;
    private LocalDateTime createdAt;

    public ActivationRequestResponse(Long id, Long userId, String userEmail,
                                     String userFullName, String message,
                                     String status, LocalDateTime createdAt) {
        this.id           = id;
        this.userId       = userId;
        this.userEmail    = userEmail;
        this.userFullName = userFullName;
        this.message      = message;
        this.status       = status;
        this.createdAt    = createdAt;
    }

    public Long getId()                  { return id; }
    public Long getUserId()              { return userId; }
    public String getUserEmail()         { return userEmail; }
    public String getUserFullName()      { return userFullName; }
    public String getMessage()           { return message; }
    public String getStatus()            { return status; }
    public LocalDateTime getCreatedAt()  { return createdAt; }
}
