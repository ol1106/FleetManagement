package com.tecnositaf.fleetmanager.domains.trips;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
public class Trip {
    @Id
    private String id;

    private Date date = new Date();
}
