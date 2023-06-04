package com.example.expenseTracker.service.impl;

import com.example.expenseTracker.exception.ResourceNotFoundException;
import com.example.expenseTracker.model.Category;
import com.example.expenseTracker.model.Expense;
import com.example.expenseTracker.repository.CategoryRepository;
import com.example.expenseTracker.repository.ExpenseRepository;
import com.example.expenseTracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseServiceImpl implements ExpenseService {
    private ExpenseRepository expenseRepository;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository, CategoryRepository categoryRepository) {
        super();
        this.expenseRepository = expenseRepository;
    }
    @Override
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public Expense getExpenseById(long id) {
        return expenseRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Expense", "Id", id));

    }
    @Override
    public Expense updateExpense(Expense expense, long id) {

        Expense existingExpense = expenseRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Expense", "Id", id));

        existingExpense.setItem(expense.getItem());
        existingExpense.setAmount(expense.getAmount());

        expenseRepository.save(existingExpense);
        return existingExpense;
    }

    @Override
    public void deleteExpense(long id) {

        expenseRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("" +
                        "Expense", "Id", id));
        expenseRepository.deleteById(id);
    }

    @Override
    public List<Expense> findByCategory(long categoryId) {
        return expenseRepository.findByCategory(categoryId);

    }

    @Override
    public List<Expense> findByDate(LocalDate localDate) {
        return expenseRepository.findByDate(localDate);
    }

    @Override
    public Map<String, Double> getCategoryTotal() {
        List<Expense> expenses = expenseRepository.findAll();
        Map<String, Double> totalExpenseByCategory = new HashMap<>();
        for (Expense expense : expenses) {
            String category = expense.getCategory().getName();
            double amount = expense.getAmount();

            totalExpenseByCategory.put(category, totalExpenseByCategory.getOrDefault(category, 0.0) + amount);
        }

        return totalExpenseByCategory;
    }

    @Override
    public Map<LocalDate, List<List<String>>> getDateTotal() {
        List<Expense> expenses = expenseRepository.findAll();
        Map<LocalDate, List<List<String>>> totalExpenseByDate = new HashMap<>();
        for (Expense expense : expenses) {
            if (expense.getDate() == null) {
                continue;
            }
            LocalDate date = expense.getDate();
            List<List<String>> expenseList = totalExpenseByDate.getOrDefault(date, new ArrayList<>());
            List<String> expenseString = new ArrayList<>();
            expenseString.add(String.valueOf(expense.getId()));
            expenseString.add(expense.getItem());
            expenseString.add(String.valueOf(expense.getAmount()));
            expenseString.add(expense.getCategory().getName());
            expenseList.add(expenseString);
            totalExpenseByDate.put(date, expenseList);
        }

        return totalExpenseByDate;
    }
}
