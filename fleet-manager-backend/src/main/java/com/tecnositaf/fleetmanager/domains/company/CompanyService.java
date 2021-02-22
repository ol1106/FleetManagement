package com.tecnositaf.fleetmanager.domains.company;

import com.tecnositaf.fleetmanager.domains.driver.Driver;
import com.tecnositaf.fleetmanager.domains.driver.DriverRepository;
import com.tecnositaf.fleetmanager.domains.fleet.FleetRepository;
import com.tecnositaf.fleetmanager.domains.vehicle.Vehicle;
import com.tecnositaf.fleetmanager.domains.vehicle.VehicleRepository;
import com.tecnositaf.fleetmanager.domains.vehicle.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private FleetRepository fleetRepository;

    public List<Company> getAllCompanies() {
    return companyRepository.findAll();
    }

    public ResponseEntity<Company> getCompanyById(String id){
        Optional<Company> company=companyRepository.findById(id);
        if(company.isPresent()){
            return new ResponseEntity<>(company.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity addCompany(Company company) {
        if (validateCompany(company)==null) {
            if (companyRepository.findByName(company.getName()) == null && companyRepository.findByEmail(company.getEmail()) == null) {
                companyRepository.save(company);
                return new ResponseEntity(companyRepository.findAll(),HttpStatus.OK);
            } else {
                return new ResponseEntity("Company name or email already exists.",HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity(validateCompany(company),HttpStatus.BAD_REQUEST);
        }

    }

    public List<Company> deleteCompany(String id) {
        companyRepository.deleteById(id);
        fleetRepository.deleteAllByCompanyId(id);
        List<Vehicle> vehicleList = vehicleRepository.findAllByCompanyId(id);
        for (Vehicle vehicle : vehicleList) {
            vehicleService.deleteVehicleById(vehicle.getId());
        }
        driverRepository.deleteAllByCompanyId(id);
        return companyRepository.findAll();
    }

    public ResponseEntity updateCompany(Company company){
        if (validateCompany(company)==null) {
            if (companyRepository.findById(company.getId()).isEmpty()) {
                return new ResponseEntity(companyRepository.findAll(),HttpStatus.OK);
            }
            companyRepository.save(company);
            return new ResponseEntity(companyRepository.findAll(),HttpStatus.OK);
        } else return new ResponseEntity(validateCompany(company),HttpStatus.BAD_REQUEST);
    }

    public String validateCompany(Company company) {
        if (company.getName()==null || company.getName().isEmpty()) {
            return "Company name is null or empty.";
        } else if (company.getAddress().getState()==null || company.getAddress().getState().isEmpty()) {
            return "Company state is null or empty.";
        } else if (company.getAddress().getCity()==null || company.getAddress().getCity().isEmpty()) {
            return "Company city is null or empty.";
        } else if (company.getAddress().getPostalCode()==null  || company.getAddress().getPostalCode() == 0) {
            return "Company postal code is null or not valid.";
        }  else if (company.getEmail() ==null || !isValid(company.getEmail())) {
            return "Company email is not valid or null.";
        } else {
            return null;
        }

    }

    public boolean isValid(String email) {
        String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
        return email.matches(regex);
    }
}
