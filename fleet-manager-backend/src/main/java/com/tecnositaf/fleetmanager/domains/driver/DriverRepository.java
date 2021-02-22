package com.tecnositaf.fleetmanager.domains.driver;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends MongoRepository<Driver,String> {

    Page<Driver> findAllByCompanyId(String companyId, Pageable pageable);
    void deleteAllByCompanyId(String companyId);
    Optional<Driver> findDriverById(String id);
    Optional<Driver>findByVehicleId(String id);
    Boolean existsByName(String name);
}
