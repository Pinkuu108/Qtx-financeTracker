package com.example.financeTracker.repository;

import java.time.LocalDateTime;
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
    	       "AND t.type = com.example.financeTracker.entity.TransactionType.DEBIT " +
    	       "AND t.transdate >= :startOfDay " +
    	       "AND t.transdate < :endOfDay")
    	Double sumDebitByUserAndDate(@Param("userId") Long userId,
    	                              @Param("startOfDay") LocalDateTime startOfDay,
    	                              @Param("endOfDay") LocalDateTime endOfDay);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM UserTransaction t " +
           "WHERE t.user.id = :userId " +
           "AND t.type = 'DEBIT' " +
           "AND YEAR(t.transdate) = :year " +
           "AND MONTH(t.transdate) = :month")
    Double sumDebitByUserAndMonth(@Param("userId") Long userId,
                                  @Param("year") int year,
                                  @Param("month") int month);
}