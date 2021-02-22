package com.tecnositaf.fleetmanager.domains.company;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyRepository extends MongoRepository<Company,String> {
Company findByName(String name);
Company findByEmail(String email);
boolean existsById(String id);

}
