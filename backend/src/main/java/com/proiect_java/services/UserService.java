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
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public UserService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok().body(userRepository.findAll());
    }

    public ResponseEntity<?> getUser(int userID) {
        Optional<User> foundUser = userRepository.findById(userID);

        if(foundUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilizatorul nu a fost gasit.");
        }
        return ResponseEntity.ok().body(foundUser.get());
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

    public ResponseEntity<?> updateUser(User user) {
        Optional<User> foundUser = userRepository.findById(user.getId());

        if(foundUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilizatorul nu a fost gasit.");
        }

        foundUser.get().setEmail(user.getEmail());
        foundUser.get().setName(user.getName());
        foundUser.get().setRole(user.getRole());

        User savedUser = userRepository.save(foundUser.get());

        return ResponseEntity.ok().body(savedUser);
    }

    public ResponseEntity<?> deleteUser(int userID) {
        Optional<User> foundUser = userRepository.findById(userID);
        if(foundUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilizatorul nu a fost gasit.");
        }

        userRepository.delete(foundUser.get());

        return ResponseEntity.ok().build();
    }
}
