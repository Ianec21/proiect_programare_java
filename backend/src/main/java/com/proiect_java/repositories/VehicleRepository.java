package com.proiect_java.repositories;

import com.proiect_java.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
    List<Vehicle> findByBrandAndColorAndFuelType(String brand, String color, String fuelType);
}
