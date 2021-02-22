package com.tecnositaf.fleetmanager.domains.vehicleClass;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;

@Data
public class VehicleClass {

    @Id
    private String id;

    @NotNull
    private Integer classNr;

    @NotNull
    private String icon;

    @NotNull
    private Integer axes;

    private String description;

}
