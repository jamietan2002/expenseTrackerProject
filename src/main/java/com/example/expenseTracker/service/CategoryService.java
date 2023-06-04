package com.example.expenseTracker.service;

import com.example.expenseTracker.model.Category;
import com.example.expenseTracker.model.Expense;

import java.util.List;

public interface CategoryService {
    public Category addCategory(Category category);
    List<Category> getAllCategories();
    Category getCategoryById(long id);
    Category updateCategory(Category category, long id);

    void deleteCategory(long id);
}
