package com.tecnositaf.fleetmanager.domains.company;

import com.tecnositaf.fleetmanager.domains.fleet.Fleet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/fleet/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private CompanyRepository companyRepository;

    @GetMapping("/get/page/{page}/size/{size}")
    public Page<Company> getPage(@PathVariable int page, @PathVariable int size) {
        Pageable pageable = PageRequest.of(page, size);
        return companyRepository.findAll(pageable);
    }

    @RequestMapping(value = "/getCompaniesNames", method = RequestMethod.GET)
    public List<Company> getCompaniesByIdList(List<String> idList) {
    return null;
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public List<Company> getAllCompanies() {
    return companyService.getAllCompanies();
}

    @RequestMapping(value="/getById/{id}",method = RequestMethod.GET)
    public ResponseEntity<Company> getCompanyById(@PathVariable String id){
        return companyService.getCompanyById(id);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addCompany(@RequestBody Company company) {

        return companyService.addCompany(company);
    }

    @RequestMapping(value = "/deleteById/{id}", method = RequestMethod.DELETE)
    public List<Company> deleteById(@PathVariable String id) {
        return companyService.deleteCompany(id);
    }

    @PutMapping("/update")
    public ResponseEntity updateCompany(@RequestBody Company company){
        return companyService.updateCompany(company);
    }
}
