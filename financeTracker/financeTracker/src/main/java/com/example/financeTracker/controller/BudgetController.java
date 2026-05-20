package com.example.financeTracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.financeTracker.config.JwtPrincipal;
import com.example.financeTracker.dto.BudgetResponse;
import com.example.financeTracker.dto.BudgetSetupRequest;
import com.example.financeTracker.dto.DailyStatusResponse;
import com.example.financeTracker.dto.MonthlyStatusResponse;
import com.example.financeTracker.service.BudgetService;

@RestController
@RequestMapping("/user/budget")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping("/setup")
    public ResponseEntity<BudgetResponse> setupBudget(@RequestBody BudgetSetupRequest request,
                                                       Authentication authentication) {
        JwtPrincipal principal = (JwtPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(budgetService.setupBudget(principal.userId(), request));
    }

    @GetMapping("/me")
    public ResponseEntity<BudgetResponse> getMyBudget(Authentication authentication) {
        JwtPrincipal principal = (JwtPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(budgetService.getMyBudget(principal.userId()));
    }

    @GetMapping("/daily")
    public ResponseEntity<DailyStatusResponse> getDailyStatus(Authentication authentication) {
        JwtPrincipal principal = (JwtPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(budgetService.getDailyStatus(principal.userId()));
    }

    @GetMapping("/monthly")
    public ResponseEntity<MonthlyStatusResponse> getMonthlyStatus(Authentication authentication) {
        JwtPrincipal principal = (JwtPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(budgetService.getMonthlyStatus(principal.userId()));
    }
}