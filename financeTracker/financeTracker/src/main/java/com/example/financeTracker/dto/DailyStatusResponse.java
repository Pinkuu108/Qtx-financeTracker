package com.example.financeTracker.dto;

public class DailyStatusResponse {

    private String date;
    private double dailyLimit;
    private double spent;
    private double remaining;
    private String status; // EXCEEDED or WITHIN

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public double getDailyLimit() { return dailyLimit; }
    public void setDailyLimit(double dailyLimit) { this.dailyLimit = dailyLimit; }

    public double getSpent() { return spent; }
    public void setSpent(double spent) { this.spent = spent; }

    public double getRemaining() { return remaining; }
    public void setRemaining(double remaining) { this.remaining = remaining; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}