package com.example.financeTracker.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activation_requests")
public class ActivationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String message;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = RequestStatus.PENDING;
        }
    }

    public Long getId()                        { return id; }
    public void setId(Long id)                 { this.id = id; }

    public User getUser()                      { return user; }
    public void setUser(User user)             { this.user = user; }

    public String getMessage()                 { return message; }
    public void setMessage(String message)     { this.message = message; }

    public RequestStatus getStatus()                   { return status; }
    public void setStatus(RequestStatus status)        { this.status = status; }

    public LocalDateTime getCreatedAt()                { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt)  { this.createdAt = createdAt; }
}
