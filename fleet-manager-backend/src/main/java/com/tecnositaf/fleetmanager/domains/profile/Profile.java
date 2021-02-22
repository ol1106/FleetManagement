package com.tecnositaf.fleetmanager.domains.profile;

import com.tecnositaf.fleetmanager.domains.address.Address;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class Profile {

    @Email
    @NotNull
    private String email;

    @NotNull
    private String phoneNr;

    private String photo;

    private String description;

    private Address addressDriver;
}
