package com.tecnositaf.fleetmanager.domains.vehicleClass;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fleet")
public class VehicleClassController {
    @Autowired
    private VehicleClassService vehicleClassService;



    @GetMapping("/vehicleClass/all")
    public ResponseEntity<List<VehicleClass>> getAllVehicleClass(){
        return vehicleClassService.getAllVehicleClass();
    }



    @GetMapping("/vehicleClass/{id}")
    public ResponseEntity<VehicleClass> getOneVehicleClass(@PathVariable("id")String id){
        return  vehicleClassService.getOneVehicleClass(id);
    }



    @PostMapping("/vehicleClass/add")
    public  ResponseEntity<VehicleClass> addNewVehicleClass(@RequestBody VehicleClass vehicleClass){
        return vehicleClassService.addVehicleClass(vehicleClass);
    }



    @DeleteMapping("/vehicleClass/delete/{id}")
    public ResponseEntity<VehicleClass> deleteOneVehicleClass(@PathVariable("id")String id){
        return vehicleClassService.deleteOneVehicleClass(id);
    }






}
