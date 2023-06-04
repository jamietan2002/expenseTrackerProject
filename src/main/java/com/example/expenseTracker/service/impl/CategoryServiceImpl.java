package com.example.expenseTracker.service.impl;

import com.example.expenseTracker.exception.ResourceNotFoundException;
import com.example.expenseTracker.model.Category;
import com.example.expenseTracker.model.Expense;
import com.example.expenseTracker.repository.CategoryRepository;
import com.example.expenseTracker.repository.ExpenseRepository;
import com.example.expenseTracker.service.CategoryService;
import com.example.expenseTracker.service.ExpenseService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        super();
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Category", "Id", id));
    }

    @Override
    public Category updateCategory(Category category, long id) {
        Category existingCategory = categoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Category", "Id", id));

        existingCategory.setName(category.getName());

        categoryRepository.save(existingCategory);
        return existingCategory;
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("" +
                        "Category", "Id", id));
        categoryRepository.deleteById(id);
    }

}
