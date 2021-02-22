package com.tecnositaf.fleetmanager.domains.fleet;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
public class Fleet {

    @Id
    private String id;


    @NotBlank
    @NotNull
    private String name;

    private List<String> vehicleId = new ArrayList<>();

//    @NotNull
    private String companyId;

}
