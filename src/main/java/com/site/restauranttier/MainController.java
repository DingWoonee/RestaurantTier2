package com.site.restauranttier;

import com.site.restauranttier.restaurant.Restaurant;
import com.site.restauranttier.restaurant.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
public class MainController {
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/")
    public String root() {
        return "redirect:/home";
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/main/tier")
    public String tier(Model model, @RequestParam(name = "cuisine", required = false) String cuisine) {
        List<Restaurant> restaurants;
        if (cuisine != null && !cuisine.isEmpty()) {
            // cuisine 파라미터가 주어진 경우, 해당하는 데이터를 조회합니다.
            restaurants = restaurantRepository.findByRestaurantCuisine(cuisine);
        } else {
            // cuisine 파라미터가 없는 경우, 모든 레스토랑을 조회합니다.
            restaurants = restaurantRepository.findAll();
        }
        model.addAttribute("restaurants", restaurants);
        return "tier";
    }


    @GetMapping("/tier")
    public String tier() {
        return "tier";
    }

    @ResponseBody
    @GetMapping("/api/tier")
    public ResponseEntity<List<Restaurant>> getRestaurantsByCuisine(@RequestParam(name = "cuisine", required = false) String cuisine) {
        List<Restaurant> restaurants;
        if (cuisine != null && !cuisine.isEmpty()) {
            // cuisine 파라미터가 주어진 경우, 해당하는 데이터를 조회합니다.
            restaurants = restaurantRepository.findByRestaurantCuisine(cuisine);
        } else {
            // cuisine 파라미터가 없는 경우, 모든 레스토랑을 조회합니다.
            restaurants = restaurantRepository.findAll();
        }

        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @GetMapping("/talk")
    public String talk() {
        return "community";
    }

    @GetMapping("/ranking")
    public String ranking() {
        return "ranking";
    }

    @GetMapping("/login/callback")
    public String auth() {
        return "callback";
    }
    @ResponseBody
    @PostMapping("/api/user")
    public ResponseEntity<?> userCreated(@RequestBody Map<String,String> userData){
        String userId = userData.get("userId");
        String userEmail = userData.get("userEmail");
        String userNickname=userData.get("userNickname");

        Optional<User> userOptional = userRepository.findById(userId);
        
        // 기존 사용자면 정보 업데이트
        if(userOptional.isPresent()){
            User user=userOptional.get();
            user.setUserEmail(userEmail);
            user.setUserNickname(userNickname);
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);
        }
        // 새로운 사용자면 user 객체 만들고 db에 저장
        else{
        User newUser = new User();
        newUser.setUserId(userId);
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUserEmail(userEmail);
        newUser.setUserNickname(userNickname);
        newUser.setStatus("ACTIVE");
        userRepository.save(newUser);
        }
        return ResponseEntity.ok().build();
    }
}
