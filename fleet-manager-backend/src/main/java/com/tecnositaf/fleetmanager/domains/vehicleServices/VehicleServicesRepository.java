package com.tecnositaf.fleetmanager.domains.vehicleServices;

import com.tecnositaf.fleetmanager.domains.driver.Driver;
import com.tecnositaf.fleetmanager.domains.vehicle.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.ReactiveHttpOutputMessage;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleServicesRepository extends MongoRepository<VehicleServices, String> {
    List<VehicleServices> findAll();
    Optional<VehicleServices> findById(String id);
    List<VehicleServices> findByName(String name);
    void deleteAllByVehicleId(String vehicleId);

}
