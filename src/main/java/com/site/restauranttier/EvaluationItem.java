package com.site.restauranttier;

import jakarta.persistence.*;

@Entity
public class EvaluationItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    private String itemName;
    // Getters and Setters...
}
