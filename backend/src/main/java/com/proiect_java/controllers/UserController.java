package com.proiect_java.controllers;

import com.proiect_java.entities.User;
import com.proiect_java.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("users")
    public String getUsers(){
        return "Users";
    }

    @PostMapping("/users/sign-up")
    public ResponseEntity<?> signUp(@RequestBody User user){
        return userService.signUp(user);
    }

    @PostMapping("/users/sign-in")
    public ResponseEntity<?> signIn(@RequestBody User user){
        return userService.signIn(user);
    }
}
