package com.example.financeTracker.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.financeTracker.entity.User;
import com.example.financeTracker.entity.UserTransaction;

public interface TransactionRepository extends JpaRepository<UserTransaction, Long> {

    List<UserTransaction> findByUser(User user);
    boolean existsByCategoryId(Long categoryId);
    void deleteByCategoryId(Long categoryId);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM UserTransaction t " +
           "WHERE t.user.id = :userId " +
           "AND t.type = 'DEBIT' " +
           "AND DATE(t.transdate) = :date")
    Double sumDebitByUserAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM UserTransaction t " +
           "WHERE t.user.id = :userId " +
           "AND t.type = 'DEBIT' " +
           "AND YEAR(t.transdate) = :year " +
           "AND MONTH(t.transdate) = :month")
    Double sumDebitByUserAndMonth(@Param("userId") Long userId,
                                  @Param("year") int year,
                                  @Param("month") int month);
}