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
        if(brand.isEmpty() && color.isEmpty() && fuelType.isEmpty()){
            return ResponseEntity.ok().body(vehicleRepository.findAll());
        }

        if(!brand.isEmpty() && color.isEmpty() && fuelType.isEmpty()){
            return ResponseEntity.ok().body(vehicleRepository.findByBrand(brand));
        }

        if(brand.isEmpty() && !color.isEmpty() && fuelType.isEmpty()){
            return ResponseEntity.ok().body(vehicleRepository.findByColor(color));
        }

        if(brand.isEmpty() && color.isEmpty()){
            return ResponseEntity.ok().body(vehicleRepository.findByFuelType(fuelType));
        }

        if(!brand.isEmpty() && !color.isEmpty() && fuelType.isEmpty()){
            return ResponseEntity.ok().body(vehicleRepository.findByBrandAndColor(brand, color));
        }

        if(!brand.isEmpty() && color.isEmpty() && !fuelType.isEmpty()){
            return ResponseEntity.ok().body(vehicleRepository.findByBrandAndFuelType(brand, fuelType));
        }

        if(brand.isEmpty() && !color.isEmpty() && !fuelType.isEmpty()){
            return ResponseEntity.ok().body(vehicleRepository.findByColorAndFuelType(color, fuelType));
        }

        return ResponseEntity.ok().body(vehicleRepository.findByBrandAndColorAndFuelType(brand, color, fuelType));
    }

    public ResponseEntity<?> addVehicle(@RequestBody Vehicle vehicle) {
        if(vehicle.getTextPlate().isEmpty()){
            return ResponseEntity.badRequest().body("Introduceti un numar de inmatriculare.");
        }

        if(vehicle.getBrand().isEmpty()){
            return ResponseEntity.badRequest().body("Introduceti marca.");
        }

        if(vehicle.getModel().isEmpty()){
            return ResponseEntity.badRequest().body("Introduceti modelul.");
        }

        if(vehicle.getColor().isEmpty()){
            return ResponseEntity.badRequest().body("Introduceti culoarea.");
        }

        if(vehicle.getFuelType().isEmpty()){
            return ResponseEntity.badRequest().body("Introduceti tipul combustibilului.");
        }

        if(vehicle.getYear() <= 0){
            return ResponseEntity.badRequest().body("Introduceti un an valabil!");
        }

        if(vehicle.getEngineSize() <= 0){
            return ResponseEntity.badRequest().body("Introduceti capacitatea motorului!");
        }

        if(vehicle.getTorque() <= 0){
            return ResponseEntity.badRequest().body("Introduceti cuplul!");
        }

        if(vehicle.getTrunkVolume() <= 0){
            return ResponseEntity.badRequest().body("Introduceti volumul portbagajului!");
        }

        if(vehicle.getPrice() <= 0){
            return ResponseEntity.badRequest().body("Introduceti pretul!");
        }

        if(vehicle.getPower() <= 0){
            return ResponseEntity.badRequest().body("Introduceti puterea (HP)!");
        }

        Vehicle foundVehicle = vehicleRepository.findByTextPlate(vehicle.getTextPlate());
        if(foundVehicle == null){
            foundVehicle = vehicle;
            return ResponseEntity.ok().body(foundVehicle);
        }

        return ResponseEntity.ok().body(vehicleRepository.save(vehicle));
    }
}
