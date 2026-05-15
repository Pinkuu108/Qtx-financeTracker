package com.example.financeTracker.controller;

import com.example.financeTracker.config.JwtPrincipal;
import com.example.financeTracker.dto.TransactionRequest;
import com.example.financeTracker.entity.UserTransaction;
import com.example.financeTracker.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/transactions")
    public ResponseEntity<String> saveTransaction(@RequestBody TransactionRequest request,
                                                   Authentication authentication) {
        JwtPrincipal principal = (JwtPrincipal) authentication.getPrincipal();
        request.setUserId(principal.userId());
        return ResponseEntity.ok(transactionService.saveTransaction(request));
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<UserTransaction>> getTransactions(Authentication authentication) {
        JwtPrincipal principal = (JwtPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(transactionService.getTransactionsByUser(principal.userId()));
    }
}
