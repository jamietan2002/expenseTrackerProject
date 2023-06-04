package com.example.expenseTracker.controller;

import com.example.expenseTracker.model.Category;
import com.example.expenseTracker.model.Expense;
import com.example.expenseTracker.service.CategoryService;
import com.example.expenseTracker.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        super();
        this.categoryService = categoryService;
    }

    //create new expense
    @PostMapping()
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        return new ResponseEntity<Category>(categoryService.addCategory(category), HttpStatus.CREATED);
    }

    @GetMapping()
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") long categoryId) {
        return new ResponseEntity<Category>(categoryService.getCategoryById(categoryId), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") long id
            , @RequestBody Category category) {
        return new ResponseEntity<Category>(categoryService.updateCategory(category, id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable("id") long id) {

        categoryService.deleteCategory(id);

        return new ResponseEntity<String>("Category deleted successfully!.", HttpStatus.OK);
    }
}