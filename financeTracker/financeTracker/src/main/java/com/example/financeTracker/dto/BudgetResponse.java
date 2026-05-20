package com.example.financeTracker.dto;

import com.example.financeTracker.entity.BudgetingType;

public class BudgetResponse {

    private BudgetingType budgetingType;
    private double salary;
    private double dailyLimit;

    // 50/30/20
    private double needsAmount;
    private double wantsAmount;

    // both rules
    private double savingsAmount;

    public BudgetingType getBudgetingType() { return budgetingType; }
    public void setBudgetingType(BudgetingType budgetingType) { this.budgetingType = budgetingType; }

    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }

    public double getDailyLimit() { return dailyLimit; }
    public void setDailyLimit(double dailyLimit) { this.dailyLimit = dailyLimit; }

    public double getNeedsAmount() { return needsAmount; }
    public void setNeedsAmount(double needsAmount) { this.needsAmount = needsAmount; }

    public double getWantsAmount() { return wantsAmount; }
    public void setWantsAmount(double wantsAmount) { this.wantsAmount = wantsAmount; }

    public double getSavingsAmount() { return savingsAmount; }
    public void setSavingsAmount(double savingsAmount) { this.savingsAmount = savingsAmount; }
}