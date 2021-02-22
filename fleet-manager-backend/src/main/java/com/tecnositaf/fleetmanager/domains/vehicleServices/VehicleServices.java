package com.tecnositaf.fleetmanager.domains.vehicleServices;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "services")
public class VehicleServices {

    @Id
    private String id;

    @NotNull(message = "Name is mandatory")
    @Size(min = 3, max = 100)
    private String name;

    @NotNull(message = "Time frequency is mandatory")
    @Size(min = 1)
    private Integer time_freq;

    @NotNull(message = "Kilometer frequency is mandatory")
    @Size(min = 1)
    private Integer km_freq;


    @NotNull(message = "Parts of the service are mandatory  ")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private List<String> parts;


    private String vehicleId;

     public VehicleServices(){

     }


}
