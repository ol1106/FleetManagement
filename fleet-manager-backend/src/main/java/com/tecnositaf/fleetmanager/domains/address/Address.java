package com.tecnositaf.fleetmanager.domains.address;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document()
public class Address {

    private String state;

    private String city;

    private Integer postalCode;
}
