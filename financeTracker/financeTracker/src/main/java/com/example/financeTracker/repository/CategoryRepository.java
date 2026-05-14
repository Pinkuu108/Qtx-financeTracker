package com.example.financeTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.financeTracker.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}