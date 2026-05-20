package com.example.financeTracker.dto;

public class MonthlyStatusResponse {

    private String month;
    private double salary;
    private double spendableAmount;
    private double savingsAmount;
    private double totalSpent;
    private double remaining;
    private String status; // EXCEEDED or WITHIN

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }

    public double getSpendableAmount() { return spendableAmount; }
    public void setSpendableAmount(double spendableAmount) { this.spendableAmount = spendableAmount; }

    public double getSavingsAmount() { return savingsAmount; }
    public void setSavingsAmount(double savingsAmount) { this.savingsAmount = savingsAmount; }

    public double getTotalSpent() { return totalSpent; }
    public void setTotalSpent(double totalSpent) { this.totalSpent = totalSpent; }

    public double getRemaining() { return remaining; }
    public void setRemaining(double remaining) { this.remaining = remaining; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}