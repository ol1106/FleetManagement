package com.tecnositaf.fleetmanager.domains.driver;

import com.tecnositaf.fleetmanager.domains.company.Company;
import com.tecnositaf.fleetmanager.domains.company.CompanyRepository;
import com.tecnositaf.fleetmanager.domains.users.User;
import com.tecnositaf.fleetmanager.domains.users.UserRepository;
import com.tecnositaf.fleetmanager.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<Page<Driver>> getAllDrivers(int page, int size, String companyId){
        Pageable paging = PageRequest.of(page,size);
        return new ResponseEntity<>(driverRepository.findAllByCompanyId(companyId,paging),HttpStatus.OK);
    }


    public ResponseEntity<Driver> getDriverById(String id){
        Optional<Driver> driver=driverRepository.findDriverById(id);
        return driver.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<?> addDriver(Driver driver,String companyId){
        Optional<Company> company=companyRepository.findById(companyId);
        if(company.isPresent()) {
            try {
                if (driverRepository.existsByName(driver.getName())) {
                    return ResponseEntity
                            .badRequest()
                            .body(new MessageResponse("Error: Driver already created with this name!"));
                }
                Driver newDriver = driverRepository.save(driver);
                List<String> drivers=company.get().getDriverId();

                drivers.add(newDriver.getId());
                company.get().setDriverId(drivers);
                companyRepository.save(company.get());
                return new ResponseEntity<>(newDriver,HttpStatus.CREATED);
            }
            catch (Exception e){
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Driver> updateDriver(String id,Driver driver){
        Optional<Driver> driverData=driverRepository.findById(id);
        if(driverData.isPresent()){
            Optional<User> user=userRepository.findById(id);
            user.ifPresent(value -> value.setEmail(driver.getProfile().getEmail()));
            driverData.get().setName(driver.getName());
            driverData.get().setProfile(driver.getProfile());
            driverData.get().setVehicleId(driver.getVehicleId());
            return new ResponseEntity<>(driverRepository.save(driverData.get()),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<HttpStatus> deleteDriver(String id,String companyId){
        Optional<Driver> driver=driverRepository.findById(id);
        if(driver.isPresent()){
            try{
                Optional<Company> company=companyRepository.findById(companyId);
                Optional<User> user=userRepository.findById(id);
                if(company.isPresent() && user.isPresent()) {
                    company.ifPresent(value -> value.getDriverId().remove(id));
                    companyRepository.save(company.get());
                    userRepository.deleteById(id);
                    driverRepository.deleteById(id);
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
            }
            catch (Exception e){
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<HttpStatus> deleteAllDrivers(String companyId){
        Optional<Company> company=companyRepository.findById(companyId);
        if(company.isPresent()){
            try {
                company.get().getDriverId().clear();
                companyRepository.save(company.get());
                driverRepository.deleteAllByCompanyId(companyId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            catch (Exception e){
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
