package com.site.restauranttier.controller;

import com.site.restauranttier.entity.*;
import com.site.restauranttier.etc.JsonData;
import com.site.restauranttier.etc.RestaurantTierDataClass;
import com.site.restauranttier.repository.*;
import com.site.restauranttier.service.EvaluationService;
import com.site.restauranttier.service.FeedbackService;
import com.site.restauranttier.service.RestaurantCommentService;
import com.site.restauranttier.service.RestaurantService;
import groovy.util.Eval;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.*;

@RequiredArgsConstructor
@Controller
public class MainController {
    private final RestaurantRepository restaurantRepository;
    private final FeedbackService feedbackService;
    private final RestaurantService restaurantService;
    private final EvaluationService evaluationService;
    private static final Logger logger = LoggerFactory.getLogger(MainController.class);

    //@Value("#{'${restaurant.cuisines}'.split(',\\s*')}")
    private List<String> cuisines = Arrays.asList(
            "전체", "한식", "일식", "중식", "양식", "아시안", "고기",
            "치킨", "해산물", "햄버거/피자", "분식", "술집", "카페/디저트",
            "베이커리", "기타"
    );

    @GetMapping("/home")
    public String home() {
        return "redirect:/";
    }


    // 홈 화면
    @GetMapping("/")
    public String root(Model model) {
        List<Restaurant> restaurants = restaurantService.getTopRestaurantsByCuisine();
        model.addAttribute("restaurants",restaurants);
        model.addAttribute("currentPage","home");
        return "home";
    }

    // 검색 결과 화면
    @GetMapping("/search")
    public String search(Model model, @RequestParam(value = "kw", defaultValue = "") String kw) {
        if (kw.isEmpty()) {
            model.addAttribute("kw", "입력된 검색어가 없습니다.");
            return "searchResult";
        } else {
            model.addAttribute("kw", kw);
        }

        String[] kwList = kw.split(" "); // 검색어 공백 단위로 끊음
        List<Restaurant> restaurantList = restaurantService.searchRestaurants(kwList);

        List<RestaurantTierDataClass> restaurantTierDataClassList = evaluationService.convertToTierDataClassList(restaurantList, null);

        model.addAttribute("restaurantTierData", restaurantTierDataClassList);

        return "searchResult";
    }

    @PreAuthorize("isAuthenticated() and hasRole('USER')")
    @PostMapping("/api/feedback")
    public ResponseEntity<String> submitFeedback(
            @RequestBody Map<String, Object> jsonBody,
            Principal principal
    ) {
        String feedbackBody = jsonBody.get("feedbackBody").toString();

        if (feedbackBody.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("내용이 없습니다.");
        }

        String result = feedbackService.addFeedback(feedbackBody, principal);

        if (result.equals("fail")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("잘못된 접근입니다.");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body("피드백 감사합니다.");
        }
    }
}




