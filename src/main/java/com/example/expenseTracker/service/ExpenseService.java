package com.example.expenseTracker.service;

import com.example.expenseTracker.model.Category;
import com.example.expenseTracker.model.Expense;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ExpenseService {
    Expense saveExpense(Expense expense);
    List<Expense> getAllExpenses();
    Expense getExpenseById(long id);
    Expense updateExpense(Expense expense, long id);
    void deleteExpense(long id);

    List<Expense> findByCategory(long CategoryId);
    List<Expense> findByDate(LocalDate localDate);
    Map<String, Double> getCategoryTotal();
    Map<LocalDate, List<List<String>>> getDateTotal();
}
