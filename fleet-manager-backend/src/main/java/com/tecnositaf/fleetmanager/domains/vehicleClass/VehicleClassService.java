package com.tecnositaf.fleetmanager.domains.vehicleClass;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleClassService {

    @Autowired
    private VehicleClassRepository vehicleClassRepository;



    //return  all VehicleClass
    public ResponseEntity<List<VehicleClass>> getAllVehicleClass() {
        List<VehicleClass> vehicleClasses=vehicleClassRepository.findAll();
        try {
            if (vehicleClasses.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(vehicleClasses, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





    //return one Vehicle Class
    public ResponseEntity<VehicleClass> getOneVehicleClass(String id) {

            Optional<VehicleClass> vhClass=vehicleClassRepository.findById(id);
            if(vhClass.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(vhClass.get(), HttpStatus.OK);
    }




        //Add  one vehicleClass if doesn't exist on db
    public ResponseEntity<VehicleClass> addVehicleClass(VehicleClass vehicleClass) {

        List<VehicleClass> vh=vehicleClassRepository.findByClassNrAndAxes(vehicleClass.getClassNr(),vehicleClass.getAxes());
        if(vh.size()==0){
            vehicleClassRepository.save(vehicleClass);
            return new ResponseEntity<>(vehicleClass,HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
          }
    }



    //delete all vehicleClass from db
    public ResponseEntity<VehicleClass> deleteAllVehicleClass() {
        try{
            vehicleClassRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.OK);
        }

        catch(Exception e){
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    public ResponseEntity<VehicleClass> deleteOneVehicleClass(String id) {
        try{
            Optional<VehicleClass> vhClass=vehicleClassRepository.findById(id);
            vhClass.ifPresent(vehicleClass -> vehicleClassRepository.delete(vehicleClass));
            return new ResponseEntity<>(HttpStatus.OK);
        }
         catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

