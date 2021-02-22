package com.tecnositaf.fleetmanager.domains.vehicleIssue;

import com.tecnositaf.fleetmanager.domains.vehicle.Vehicle;
import com.tecnositaf.fleetmanager.domains.vehicle.VehicleRepository;
import com.tecnositaf.fleetmanager.domains.vehicle.VehicleService;
import com.tecnositaf.fleetmanager.domains.vehicleClass.VehicleClass;
import com.tecnositaf.fleetmanager.domains.vehicleServices.VehicleServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleIssueService {
    @Autowired
   private VehicleIssueRepository vehicleIssueRepository;

    @Autowired
   private VehicleRepository vehicleRepository;
    @Autowired
    private VehicleService vehicleService;

    /*
     * Returns all existing Vehicle Issues
     */
//    public ResponseEntity<Page<VehicleIssue>> getAllVehicleIssues(int page, int size, String vehicleId) {
//        Pageable paging = PageRequest.of(page,size);
//        vehicleIssueRepository.findAllByVehicleId(vehicleId, paging);
//        return new ResponseEntity<>(vehicleIssueRepository.findAllByVehicleId(vehicleId, paging), HttpStatus.OK);
//    }

    /*
     * Returns a specific Vehicle Issue
     */

    public List<VehicleIssue> findVehicleIssueByVehicleIdAndId(String companyId) {

        List<Vehicle> list1 = vehicleService.getAllVehicle(companyId);
        List<String> vehicleIdList = new ArrayList<>();
        List<VehicleIssue> vehicleIssueList = new ArrayList<>();
        List<VehicleIssue> finalList = new ArrayList<>();

        list1.forEach(vehicleId-> {vehicleIdList.add(vehicleId.getId());});

        vehicleIdList.forEach(vehIssue->{

                    if(!vehicleIssueRepository.findAllByVehicleId(vehIssue).isEmpty()){
                        vehicleIssueList.addAll(vehicleIssueRepository.findAllByVehicleId(vehIssue));
                   System.out.println(vehicleIssueList);
                    }
//
//                    vehicleIssueList.forEach(issueElement ->  {finalList.add(issueElement.get(0));} );
                }
        );
        return vehicleIssueList;
    }

    /*
     * Adds a new Vehicle Issue
     */

    public ResponseEntity<VehicleIssue> addIssue(VehicleIssue issue, String vehicleId) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(vehicleId);
        if(vehicle.isPresent()){
            try{
                issue.setVehicleId(vehicleId);
                VehicleIssue newIssue = vehicleIssueRepository.save(issue);
                return new ResponseEntity<>(newIssue,HttpStatus.OK);
            }
            catch (Exception e){
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /*
     * Updates a Vehicle Issue
     */
    public ResponseEntity<VehicleIssue> updateIssue(VehicleIssue issue) {
     if(vehicleIssueRepository.findById(issue.getId()).isEmpty()){
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);

     }
      vehicleIssueRepository.save(issue);
     return new ResponseEntity<>(vehicleIssueRepository.save(issue), HttpStatus.OK);

    }



    /*
     * Deletes the issue with the specified issue_id
     */
    public ResponseEntity<VehicleIssue> deleteIssue(String id, String vehicleId) {
        Optional<VehicleIssue> issues = vehicleIssueRepository.findById(id);

        if(issues.isPresent()){
            try{
                Optional<Vehicle> vehicle= vehicleRepository.findById(vehicleId);
                vehicleIssueRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            catch(Exception e){
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
