package com.example.expenseTracker.controller;

import com.example.expenseTracker.model.Category;
import com.example.expenseTracker.model.Expense;
import com.example.expenseTracker.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        super();
        this.expenseService = expenseService;
    }

    //create new expense
    @PostMapping()
    public ResponseEntity<Expense> saveExpense(@RequestBody Expense expense){
        return new ResponseEntity<Expense>(expenseService.saveExpense(expense), HttpStatus.CREATED);
    }

    @GetMapping()
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();

    }

    @GetMapping("/getByCategory/{category}")
    public List<Expense> getAllExpensesInCategory(@PathVariable("category") long categoryId) {
        return expenseService.findByCategory(categoryId);

    }
    @GetMapping("/getByDate/{date}")
    public List<Expense> getAllExpensesInDate(@PathVariable("date") LocalDate localDate) {
        return expenseService.findByDate(localDate);

    }

    @GetMapping("{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable("id") long expenseId){
        return new ResponseEntity<Expense>(expenseService.getExpenseById(expenseId), HttpStatus.OK);
    }

    @GetMapping("/categoryTotal")
    public Map<String, Double> getCategoryTotal() {
        return expenseService.getCategoryTotal();
    }

    @GetMapping("/dateTotal")
    public Map<LocalDate, List<List<String>>> getDateTotal() {
        return expenseService.getDateTotal();
    }


    @PutMapping("{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable("id") long id
            , @RequestBody Expense expense){
        return new ResponseEntity<Expense>(expenseService.updateExpense(expense, id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable("id") long id){

        expenseService.deleteExpense(id);

        return new ResponseEntity<String>("Expense deleted successfully!.", HttpStatus.OK);
    }

}
