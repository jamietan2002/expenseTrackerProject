package com.example.expenseTracker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name="expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="item", nullable = false)
    private String item;

    @Column(name="amount")
    private float amount;

    @ManyToOne
    @JoinColumn(name = "category")
    private Category category;

    @Column(name="date")
    private LocalDate date = LocalDate.now();

}
