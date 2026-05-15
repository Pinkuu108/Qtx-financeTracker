package com.example.financeTracker.dto;

import java.time.LocalDateTime;
import com.example.financeTracker.entity.TransactionType;
import com.fasterxml.jackson.annotation.JsonFormat;

public class TransactionRequest {

    private Long userId;
    private double amount;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") // ✅ tells Jackson how to parse the date
    private LocalDateTime transdate;

    private String transDetailes;
    private TransactionType type;
    private Long categoryId;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDateTime getTransdate() { return transdate; }
    public void setTransdate(LocalDateTime transdate) { this.transdate = transdate; }

    public String getTransDetailes() { return transDetailes; }
    public void setTransDetailes(String transDetailes) { this.transDetailes = transDetailes; }

    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
}