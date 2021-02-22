package com.tecnositaf.fleetmanager.domains.fleet;

import com.tecnositaf.fleetmanager.domains.company.Company;
import com.tecnositaf.fleetmanager.domains.company.CompanyRepository;
import com.tecnositaf.fleetmanager.domains.vehicle.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FleetService {

    @Autowired
    private FleetRepository fleetRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public List<Fleet> getAllFleets() {
        return fleetRepository.findAll();
    }

    public List<Fleet> getAllFleetsByCompanyId(String companyId) {
        return fleetRepository.findAllByCompanyId(companyId);
    }

    public List<Fleet> addFleet(Fleet fleet, String companyId) throws Exception {
        Optional<Company> company = companyRepository.findById(companyId);
        if (company.isPresent()) {
            if (fleetRepository.findByName(fleet.getName()) == null) {
                    fleetRepository.save(fleet);
                    return fleetRepository.findAll();
            } else {
                throw new Exception("Fleet name already exists.");
            }
        } else {
            throw new Exception("There is no company with this id.");
        }
    }

    public List<Fleet> deleteFleet(String id) {
        fleetRepository.deleteById(id);
        return fleetRepository.findAll();
    }

    public List<Fleet> deleteAllFleets() {
        fleetRepository.deleteAll();
        return fleetRepository.findAll();
    }

    public List<Fleet> addVehicleToFleet(Fleet fleet, String id) throws Exception {
        if (vehicleRepository.findById(id).isPresent()) {
            fleet.getVehicleId().add(id);
            fleetRepository.save(fleet);
            return fleetRepository.findAll();
        } else {
            throw new Exception("There is no vehicle with this id.");
        }
    }

    public List<Fleet> deleteVehicleFromFleet(Fleet fleet, String id) throws Exception {
        if (vehicleRepository.findById(id).isPresent()) {
            fleet.getVehicleId().remove(id);
            fleetRepository.save(fleet);
            return fleetRepository.findAll();
        } else {
            throw new Exception("There is no vehicle with this id.");
        }
    }


    public String validateFleet(Fleet fleet) {
        if (fleet.getName()==null || fleet.getName().isEmpty()) {
            return "Fleet name is null or empty.";
        }  else {
            return null;
        }

    }
}
