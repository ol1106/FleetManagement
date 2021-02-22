package com.tecnositaf.fleetmanager.domains.vehicleServices;

import com.mongodb.client.result.UpdateResult;
import com.tecnositaf.fleetmanager.domains.driver.Driver;
import com.tecnositaf.fleetmanager.domains.vehicle.Vehicle;
import com.tecnositaf.fleetmanager.domains.vehicleIssue.VehicleIssue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/fleet")
public class VehicleServicesController {

    @Autowired
   private VehicleServicesService servServices;

    @Autowired
    private VehicleServicesRepository vehicleServicesRepository;

    @GetMapping("/getServices/page/{page}/size/{size}")
    public Page<VehicleServices> getPageService(@PathVariable int page, @PathVariable int size) {
        Pageable pageable1 = PageRequest.of(page, size);
        return vehicleServicesRepository.findAll(pageable1);
    }

   @GetMapping("/allService")
    public List<VehicleServices>getAll(){
       return servServices.getAllServices();
   }

   @GetMapping("/find/{id}")
   public ResponseEntity<VehicleServices> findById(@PathVariable("id") String id){
   return servServices.findById(id);
   }

   @PostMapping("/addService")
    public ResponseEntity< VehicleServices> addService(@RequestBody VehicleServices serv){
       return  servServices.addService(serv);
   }

   @PutMapping("/updateService")
    public ResponseEntity<VehicleServices> updateService(@RequestBody VehicleServices serv){
       return servServices.updateService(serv);
   }

       @DeleteMapping("/deleteService/{id}")
    public  ResponseEntity<UpdateResult> deleteService(@PathVariable("id") String id) {
        return servServices.deleteService(id);
   }

   @DeleteMapping("{vehicleId}/deleteAllService")
    public ResponseEntity<HttpStatus> deleteAll(@PathVariable String vehicleId){
       return servServices.deleteAllServiceByVehicleId(vehicleId);
   }

   @GetMapping("/getByNameService/{name}")
    public List<VehicleServices> getByName(@PathVariable("name") String name){
       return servServices.findByName(name);
   }

}
