package com.tecnositaf.fleetmanager.domains.vehicleIssue;

import com.tecnositaf.fleetmanager.domains.vehicle.Vehicle;
import com.tecnositaf.fleetmanager.domains.vehicle.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.data.domain.Pageable;


@RestController
@RequestMapping("/fleet")
public class VehicleIssueController {
    @Autowired
   private VehicleIssueService vehicleIssueService;

    @Autowired
    private VehicleIssueRepository vehicleIssueRepository;

    @Autowired
   private VehicleService vehicleService;

    @GetMapping("/get/page/{page}/size/{size}")
    public Page<VehicleIssue> getPage(@PathVariable int page, @PathVariable int size) {
        Pageable pageable = PageRequest.of(page, size);
        return vehicleIssueRepository.findAll(pageable);
    }

//    @GetMapping("/get/page/{page}/size/{size}")
//    public Page <VehicleIssue> getPageofVehicles(@PathVariable int page, @PathVariable int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        return vehicleIssueRepository.findAll(pageable);
//    }


    @GetMapping("/allIssues/page/{page}/size/{size}")
    public Page<VehicleIssue> getAll(@PathVariable int page,
                                     @PathVariable int size,
                                     @PathVariable String companyId) {
        Pageable pageable = PageRequest.of(page, size);

        return vehicleIssueRepository.findAll(pageable);
    }



    @GetMapping("findIssues/{id}")
    public List<VehicleIssue>findById(@PathVariable("id") String companyId){
        return vehicleIssueService.findVehicleIssueByVehicleIdAndId(companyId);
    }

    @PostMapping("{vehicleId}/addIssue")
    public ResponseEntity< VehicleIssue> addIssue( @RequestBody VehicleIssue issue, @PathVariable String vehicleId){
        return  vehicleIssueService.addIssue(issue, vehicleId);
    }
    @PutMapping("{vehicleId}/updateIssue")
    public ResponseEntity<VehicleIssue> updateIssue(@RequestBody VehicleIssue issue){
        return vehicleIssueService.updateIssue(issue);
    }
    @DeleteMapping("{vehicleId}/deleteIssue/{id}")
    public ResponseEntity<VehicleIssue> deleteIssue(@PathVariable("id") String id,  @PathVariable String vehicleId) {
        return vehicleIssueService.deleteIssue(id, vehicleId);
    }


}
