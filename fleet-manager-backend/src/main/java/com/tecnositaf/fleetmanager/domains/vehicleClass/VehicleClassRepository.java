package com.tecnositaf.fleetmanager.domains.vehicleClass;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleClassRepository extends MongoRepository<VehicleClass,String>{
List<VehicleClass> findByClassNrAndAxes(Integer nrclass,Integer axes);
}
