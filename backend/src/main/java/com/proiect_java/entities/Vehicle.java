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
    private String TextPlate;
    private int Creator;
    private String Brand;
    private String Model;
    private int Year;
    private String Color;
    private double EngineSize;
    private String FuelType;
    private double Torque;
    private double TrunkVolume;
    private double Price;
    private double Power;
}
