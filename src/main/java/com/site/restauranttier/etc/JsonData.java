package com.site.restauranttier.etc;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JsonData {
    Double starRating;
    int restaurantId;
    List<Double> barRatings;
}
