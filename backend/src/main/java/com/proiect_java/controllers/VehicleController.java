package com.proiect_java.controllers;

import com.proiect_java.entities.Vehicle;
import com.proiect_java.services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VehicleController {
    @Autowired
    VehicleService vehicleService;

    @GetMapping("vehicles")
    public List<Vehicle> getAllVehicles() { return vehicleService.getAllVehicles(); }

    @PostMapping("vehicles/filter")
    public ResponseEntity<?> filterVehicles(@RequestBody Vehicle vehicle) {
        return vehicleService.filterVehicles(vehicle.getBrand(), vehicle.getColor(), vehicle.getFuelType());
    }

    @PostMapping("vehicle")
    public ResponseEntity<?> addVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.addVehicle(vehicle);
    }

    @PostMapping("vehicle/update")
    public ResponseEntity<?> updateVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.updateVehicle(vehicle);
    }

    @DeleteMapping("vehicle/{textPlate}")
    public ResponseEntity<?> deleteVehicle(@PathVariable String textPlate) {
        System.out.println(textPlate);
        return vehicleService.deleteVehicle(textPlate);
    }

    @GetMapping("vehicle/{textPlate}")
    public ResponseEntity<?> getVehicle(@PathVariable String textPlate) {
        return vehicleService.getVehicle(textPlate);
    }
}
