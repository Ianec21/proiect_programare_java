package com.proiect_java.controllers;

import com.proiect_java.entities.User;
import com.proiect_java.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("users")
    public ResponseEntity<?> getUsers(){
        return  userService.getAllUsers();
    }

    @PostMapping("/users/sign-up")
    public ResponseEntity<?> signUp(@RequestBody User user){
        return userService.signUp(user);
    }

    @PostMapping("/users/sign-in")
    public ResponseEntity<?> signIn(@RequestBody User user){
        return userService.signIn(user);
    }

    @GetMapping("/user/{userID}")
    public ResponseEntity<?> getUser(@PathVariable("userID") int userID){
        return userService.getUser(userID);
    }

    @PostMapping("/user/update")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

    @DeleteMapping("/user/{userID}")
    public ResponseEntity<?> deleteUser(@PathVariable("userID") int userID){
        return userService.deleteUser(userID);
    }
}
