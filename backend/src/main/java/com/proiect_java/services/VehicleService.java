package com.proiect_java.services;

import com.proiect_java.entities.Vehicle;
import com.proiect_java.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.lang.reflect.Field;
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
        if(foundVehicle != null){
            foundVehicle = vehicle;
            return ResponseEntity.ok().body(foundVehicle);
        }

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        return ResponseEntity.ok().body(savedVehicle);
    }

    public ResponseEntity<?> updateVehicle(@RequestBody Vehicle vehicle) {
        if(vehicle.getTextPlate().isEmpty()) {
            return ResponseEntity.badRequest().body("Introduceti un numar de inmatriculare.");
        }

        Vehicle foundVehicle = vehicleRepository.findByTextPlate(vehicle.getTextPlate());

        if(foundVehicle != null){
            System.out.println(foundVehicle);

            foundVehicle.setBrand(vehicle.getBrand());
            foundVehicle.setColor(vehicle.getColor());
            foundVehicle.setFuelType(vehicle.getFuelType());
            foundVehicle.setYear(vehicle.getYear());
            foundVehicle.setEngineSize(vehicle.getEngineSize());
            foundVehicle.setTorque(vehicle.getTorque());
            foundVehicle.setTrunkVolume(vehicle.getTrunkVolume());
            foundVehicle.setPrice(vehicle.getPrice());
            foundVehicle.setPower(vehicle.getPower());
            foundVehicle.setModel(vehicle.getModel());

            vehicleRepository.save(foundVehicle);
            return ResponseEntity.ok().body(foundVehicle);
        }

        return ResponseEntity.badRequest().body("Nu a fost gasita masina selectata.");
    }

    public ResponseEntity<?> deleteVehicle(String textPlate) {
        if(!textPlate.isEmpty()){
            System.out.println(textPlate);
            Vehicle foundVehicle = vehicleRepository.findByTextPlate(textPlate);
            if(foundVehicle == null){
                return ResponseEntity.badRequest().body("Nu a fost gasita masina selectata.");
            } else {
                vehicleRepository.delete(foundVehicle);
                return ResponseEntity.ok().body("Masina selectat a fost stearsa cu succes!");
            }
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> getVehicle(String textPlate) {
        if(!textPlate.isEmpty()){
            Vehicle foundVehicle = vehicleRepository.findByTextPlate(textPlate);
            if(foundVehicle == null){
                return ResponseEntity.badRequest().body("Nu a fost gasita masina selectata.");
            } else {
                return ResponseEntity.ok().body(foundVehicle);
            }
        }

        return ResponseEntity.ok().build();
    }
}
