package com.proiect_java.controllers;

import com.proiect_java.entities.Vehicle;
import com.proiect_java.services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class VehicleController {
    @Autowired
    VehicleService vehicleService;

    @GetMapping("vehicles")
    public List<Vehicle> getAllVehicles() { return vehicleService.getAllVehicles(); }
}
