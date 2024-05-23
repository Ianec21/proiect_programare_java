package com.proiect_java.services;

import com.proiect_java.entities.User;
import com.proiect_java.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public UserService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public ResponseEntity<?> signUp(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Adresa electronica este deja folosita.");
        }

        user.setRole("ROLE_USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }

    public ResponseEntity<?> signIn(User user){
        User existingUser = userRepository.findByEmail(user.getEmail());
        if(existingUser == null) {
            return ResponseEntity.badRequest().body("Utilizatorul nu a fost gasit.");
        }

        if(passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.ok().body(existingUser);
        } else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Parola incorecta.");
    }
}
