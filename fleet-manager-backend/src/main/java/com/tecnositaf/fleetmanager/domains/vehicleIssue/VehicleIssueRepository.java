package com.tecnositaf.fleetmanager.domains.vehicleIssue;

import com.tecnositaf.fleetmanager.domains.driver.Driver;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleIssueRepository extends MongoRepository<VehicleIssue, String> {

    List<VehicleIssue> findAllByVehicleId(String vehicleId);
    Optional<VehicleIssue> findById(String id);
    Page<VehicleIssue>  findAll(Pageable pageable);


}
