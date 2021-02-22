package com.tecnositaf.fleetmanager.domains.driver;

import com.tecnositaf.fleetmanager.domains.profile.Profile;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class Driver {

    @NotNull
    private String id;

    @NotNull
    private String name;

    @NotNull
    private String companyId;

    @NotNull
    private String vehicleId;

    private Profile profile;

    private List<String> tripId;



}
