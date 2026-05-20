package com.example.financeTracker.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.financeTracker.entity.Budgeting;

public interface BudgetingRepository extends JpaRepository<Budgeting, Long> {
    Optional<Budgeting> findByUserId(Long userId);
}