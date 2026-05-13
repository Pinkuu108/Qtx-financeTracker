package com.example.financeTracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.financeTracker.entity.User;
import com.example.financeTracker.entity.UserTransaction;

public interface TransactionRepository extends JpaRepository<UserTransaction, Long> {
    List<UserTransaction> findByUser(User user);  // ← added
}