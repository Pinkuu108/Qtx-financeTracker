package com.example.financeTracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.financeTracker.dto.TransactionRequest;
import com.example.financeTracker.entity.User;
import com.example.financeTracker.entity.UserTransaction;
import com.example.financeTracker.repository.TransactionRepository;
import com.example.financeTracker.repository.UserRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;  // ← added

    public String saveTransaction(TransactionRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserTransaction transaction = new UserTransaction();
        transaction.setUser(user);
        transaction.setAmount(request.getAmount());
        transaction.setTransdate(request.getTransdate());
        transaction.setTransDetailes(request.getTransDetailes());
        transactionRepository.save(transaction);

        return "Transaction Successful";
    }

    public List<UserTransaction> getTransactionsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return transactionRepository.findByUser(user);  // ← fetch history
    }
}