package com.proiect_java.services;

import com.proiect_java.entities.Vehicle;
import com.proiect_java.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {
    @Autowired
    VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() { return vehicleRepository.findAll(); }
}
