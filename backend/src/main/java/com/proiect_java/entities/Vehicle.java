package com.proiect_java.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Data
@Table(name="vehicles")
public class Vehicle {
    @Id
    private String textPlate;  // Ensure this is in camelCase
    private int creator;
    private String brand;      // Ensure this is in camelCase
    private String model;
    private int year;
    private String color;      // Ensure this is in camelCase
    private double engineSize;
    private String fuelType;   // Ensure this is in camelCase
    private double torque;
    private double trunkVolume;
    private double price;
    private double power;
}
