package com.example.expenseTracker.repository;

import com.example.expenseTracker.model.Category;
import com.example.expenseTracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    @Query("SELECT e FROM Expense e WHERE e.category.id = :categoryId")
    List<Expense> findByCategory(long categoryId);

    @Query("SELECT e FROM Expense e WHERE e.date = :localDate")
    List<Expense> findByDate(LocalDate localDate);
}
