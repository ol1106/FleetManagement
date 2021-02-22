package com.tecnositaf.fleetmanager.domains.vehicle;


import com.tecnositaf.fleetmanager.domains.driver.Driver;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends MongoRepository<Vehicle,String> {
    Optional<Vehicle> findById(String id);
    Optional<Vehicle> findByCompanyIdAndId(String companyId,String id);
    List<Vehicle> findAllByCompanyId(String companyId);
    List<Vehicle>findByVehicleServicesId(String id);
    Page<List<Vehicle>> findAllByCompanyId(String companyId, Pageable pageable);
}
