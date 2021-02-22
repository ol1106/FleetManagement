package com.tecnositaf.fleetmanager.domains.company;

import com.tecnositaf.fleetmanager.domains.address.Address;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Data
public class Company {

    @NotNull
    private String id;

    @NotNull
    @NotBlank
    @Size(min=6,max=30)
    private String name;

    private String logo;

    @NotNull
    @NotBlank
    private Address address;

    @Email
    @NotNull
    @NotBlank
    private String email;

    private String description;

    private List<String> vehicleId=new ArrayList<>();

    private List<String> driverId=new ArrayList<>();

}
