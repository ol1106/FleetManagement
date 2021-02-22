package com.tecnositaf.fleetmanager.domains.vehicleServices;


import com.mongodb.client.result.UpdateResult;
import com.tecnositaf.fleetmanager.domains.driver.Driver;
import com.tecnositaf.fleetmanager.domains.vehicle.Vehicle;
import com.tecnositaf.fleetmanager.domains.vehicle.VehicleRepository;
import com.tecnositaf.fleetmanager.domains.vehicle.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.elasticsearch.ReactiveElasticsearchRestClientProperties;
import org.springframework.data.mongodb.core.MongoTemplate;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleServicesService {

    @Autowired
    private  VehicleServicesRepository serviceRepo;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    /*
     * Returns all existing services
     */

    public List<VehicleServices> getAllServices(){
        return serviceRepo.findAll();
    }

    /*
     * Returns a specific service
     */

    public ResponseEntity<VehicleServices> findById(String servId){
        Optional<VehicleServices> services = serviceRepo.findById(servId );
        if(services.isPresent()){
            return new ResponseEntity<>(services.get(),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*
     * Adds a new service
     */
    public ResponseEntity<VehicleServices> addService(VehicleServices service){
        if(!serviceRepo.findByName(service.getName()).isEmpty()){
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try{
            VehicleServices _service = serviceRepo.save(service);
            return new ResponseEntity<>(_service, HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
    }
    /*
     * Updates a service
     */
    public ResponseEntity<VehicleServices> updateService(VehicleServices service){
       if(serviceRepo.findById(service.getId()).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
        serviceRepo.save(service);
        return new ResponseEntity<>(serviceRepo.save(service), HttpStatus.OK);
    }

    /*
     * Deletes the service with the specified service_id
     */

    public ResponseEntity<UpdateResult>deleteService(String id){
        Optional<VehicleServices> services = serviceRepo.findById(id);
        if(services.isPresent()){
            try{
                List<Vehicle> vehicle = vehicleRepository.findByVehicleServicesId(id);
                //MongoTemplate in
             UpdateResult result =  mongoTemplate.updateMulti(Query.query(Criteria.where("vehicleServicesId").in(id)), new Update().pull("vehicleServicesId", id), Vehicle.class);
              serviceRepo.deleteById(id);
               return new ResponseEntity<UpdateResult>(result, HttpStatus.OK);
            }
            catch(Exception e){
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }

//                Optional<Vehicle> vehicle= vehicleRepository.findById(vehicleId);
//                vehicle.ifPresent(value -> value.getVehicleServicesId().remove(id));
//                vehicleRepository.save(vehicle.get());
//                serviceRepo.deleteById(id);
//                return new ResponseEntity<>(HttpStatus.OK);

  public ResponseEntity<HttpStatus> deleteAllServiceByVehicleId(String vehicleId){
        Optional<Vehicle> vehicle = vehicleRepository.findById(vehicleId);
        if(vehicle.isPresent()){
        try{


            vehicle.get().getVehicleServicesId().clear();
            vehicleRepository.save(vehicle.get());
            serviceRepo.deleteAllByVehicleId(vehicleId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e)
      {return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }

    /*
     * Find one service by its name
     */


    public List<VehicleServices> findByName(String name){

        return  serviceRepo.findByName(name);
    }

}
