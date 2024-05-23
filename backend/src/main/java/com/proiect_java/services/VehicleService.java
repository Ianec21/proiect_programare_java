package com.proiect_java.services;

import com.proiect_java.entities.Vehicle;
import com.proiect_java.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class VehicleService {
    @Autowired
    VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() { return vehicleRepository.findAll(); }

    public ResponseEntity<?> filterVehicles(String brand, String color, String fuelType){
        if (brand != null && color != null && fuelType != null) {
            return ResponseEntity.ok().body(vehicleRepository.findByBrandAndColorAndFuelType(brand, color, fuelType));
        } else {
            return ResponseEntity.ok().body(vehicleRepository.findAll());
        }
    }
}
