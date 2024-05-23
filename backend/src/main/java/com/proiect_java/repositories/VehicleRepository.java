package com.proiect_java.repositories;

import com.proiect_java.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
    List<Vehicle> findByBrandAndColorAndFuelType(String brand, String color, String fuelType);
    List<Vehicle> findByBrand(String brand);
    List<Vehicle> findByColor(String color);
    List<Vehicle> findByFuelType(String fuelType);
    List<Vehicle> findByBrandAndColor(String brand, String color);
    List<Vehicle> findByColorAndFuelType(String color, String fuelType);
    List<Vehicle> findByBrandAndFuelType(String brand, String fuelType);
    Vehicle findByTextPlate(String plate);
}
