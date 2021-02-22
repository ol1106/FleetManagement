package com.tecnositaf.fleetmanager.domains.driver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/fleet")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping("{companyId}/drivers")
    // @PreAuthorize("hasAuthority('COMPANY')")
    public ResponseEntity<Page<Driver>> getAllDrivers(@PathVariable String companyId,
                                                      @RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "10") int size){
        return driverService.getAllDrivers(page,size,companyId);
    }

    @GetMapping("/drivers/{id}")
    // @PreAuthorize("hasAuthority('COMPANY')")
    public ResponseEntity<Driver> getDriverById(@PathVariable String id){
        return driverService.getDriverById(id);
    }

    @PostMapping("{companyId}/addDriver")
    // @PreAuthorize("hasAuthority('COMPANY')")
    public ResponseEntity<?> addDriver(@PathVariable String companyId, @Valid @RequestBody Driver driver){
        return driverService.addDriver(driver,companyId);
    }

    @PutMapping("updateDriver/{id}")
    // @PreAuthorize("hasAuthority('DRIVER')")
    public ResponseEntity<Driver> updateDriver(@PathVariable String id,@RequestBody Driver driver){
        return driverService.updateDriver(id, driver);
    }

    @DeleteMapping("{companyId}/deleteDriver/{id}")
    //@PreAuthorize("hasAuthority('COMPANY')")
    public ResponseEntity<HttpStatus> deleteDriver(@PathVariable String id,@PathVariable String companyId){
        return driverService.deleteDriver(id,companyId);
    }

    @DeleteMapping("{companyId}/deleteAllDrivers")
    //@PreAuthorize("hasAuthority('COMPANY')")
    public ResponseEntity<HttpStatus> deleteAllDrivers(@PathVariable String companyId){
        return driverService.deleteAllDrivers(companyId);
    }
}
