package com.example.expenseTracker.repository;

import com.example.expenseTracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepository extends JpaRepository<Category, Long> {
}
