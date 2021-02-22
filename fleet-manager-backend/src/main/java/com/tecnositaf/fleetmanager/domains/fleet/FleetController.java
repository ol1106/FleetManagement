package com.tecnositaf.fleetmanager.domains.fleet;

import com.tecnositaf.fleetmanager.domains.company.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/fleet/vehicleFleet")
public class FleetController {

    @Autowired
    private FleetService fleetService;

    @Autowired
    private FleetRepository fleetRepository;

    @GetMapping("/get/companyId/{companyId}/page/{page}/size/{size}")
    public Page<Fleet> getPage(@PathVariable String companyId, @PathVariable int page, @PathVariable int size) {
        Pageable pageable = PageRequest.of(page, size);
        return fleetRepository.findAllByCompanyId(companyId, pageable);
    }

    @GetMapping("/{companyId}/get")
    public List<Fleet> getAllFleetsByCompanyId(@PathVariable String companyId) {
        return fleetService.getAllFleetsByCompanyId(companyId);
    }

    @GetMapping("/getAll")
    public List<Fleet> getAllFleets() {
        return fleetService.getAllFleets();
    }

    @PostMapping("/add")
    public ResponseEntity addNewFleet(@RequestBody Fleet fleet) throws Exception {
        if (fleetService.validateFleet(fleet)==null) {
        if (fleet.getId() != null) {
            Fleet fleetInDataBase = fleetRepository.findByName(fleet.getName());
            if (fleetInDataBase == null) {
                fleetRepository.save(fleet);
                return new ResponseEntity<>(fleet, HttpStatus.OK);
            } else {
                if (fleetInDataBase.getId().equals(fleet.getId())) {
                    fleetRepository.save(fleet);
                    return new ResponseEntity<>(fleet, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("There is another fleet with this name.", HttpStatus.BAD_REQUEST);
                }
            }
        } else {
            if (fleetRepository.existsByName(fleet.getName()) != true) {
                fleetRepository.save(fleet);
                return new ResponseEntity<>(fleet, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("There is another fleet with this name.", HttpStatus.BAD_REQUEST);
            }
        }
    } else {
            return new ResponseEntity(fleetService.validateFleet(fleet),HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/{companyId}/add", method = RequestMethod.POST)
    public List<Fleet> addFleet(@RequestBody Fleet fleet,@PathVariable String companyId) throws Exception {
        return fleetService.addFleet(fleet,companyId);
    }

    @RequestMapping(value = "/deleteById/{id}", method = RequestMethod.DELETE)
    public List<Fleet> deleteById(@PathVariable String id) {
        return fleetService.deleteFleet(id);
    }

    @RequestMapping(value = "/deleteAll", method = RequestMethod.DELETE)
    public List<Fleet> deleteAllFleets() {
        return fleetService.deleteAllFleets();
    }

    @RequestMapping(value = "/addVehicle/{vehicleId}", method = RequestMethod.POST)
    public List<Fleet> addVehicleToFleet(@RequestBody Fleet fleet,@PathVariable String vehicleId) throws Exception {
        return fleetService.addVehicleToFleet(fleet,vehicleId);
    }

    @RequestMapping(value = "/deleteVehicle/{vehicleId}", method = RequestMethod.POST)
    public List<Fleet> deleteVehicleFromFleet(@RequestBody Fleet fleet,@PathVariable String vehicleId) throws Exception {
        return fleetService.deleteVehicleFromFleet(fleet, vehicleId);
    }


}
