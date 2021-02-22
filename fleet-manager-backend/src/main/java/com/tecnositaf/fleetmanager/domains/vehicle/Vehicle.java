package com.tecnositaf.fleetmanager.domains.vehicle;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
public class Vehicle {

    @Id
    private String id;

    @NotNull
    private String name;

    @NotNull
    private String companyId;

    private String fleetId;

    @NotNull
    private String vehicleClassId;

    private List<String> vehicleServicesId=new ArrayList<>();

    @NotNull
    private Double consumption;

    @NotNull
    private Double maxCapacity;

    @NotNull
    private Integer enginePower;

}
