package com.example.financeTracker.dto;

import com.example.financeTracker.entity.BudgetingType;

public class BudgetSetupRequest {

    private double salary;
    private BudgetingType budgetingType;

    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }

    public BudgetingType getBudgetingType() { return budgetingType; }
    public void setBudgetingType(BudgetingType budgetingType) { this.budgetingType = budgetingType; }
}