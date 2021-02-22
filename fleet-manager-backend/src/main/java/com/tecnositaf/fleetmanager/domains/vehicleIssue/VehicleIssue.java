package com.tecnositaf.fleetmanager.domains.vehicleIssue;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;

@Data
public class VehicleIssue {
    @Id
    private String id;

    @NotNull
    private String vehicleId;

    @NotNull
    private String part;

    private String status;

    private String description;

}
