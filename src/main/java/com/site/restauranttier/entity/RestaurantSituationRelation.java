package com.site.restauranttier.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "restaurant_situation_relations_tbl")
public class RestaurantSituationRelation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer relationId;

    private Integer dataCount;
    private Double scoreSum;
    private Integer situationTier;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="situation_id")
    private Situation situation;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="restaurant_id")
    private Restaurant restaurant;
}
