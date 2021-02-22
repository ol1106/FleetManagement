import {Component, OnInit} from '@angular/core';
import {FleetService} from "../../_services/fleet.service";
import {MatDialog} from "@angular/material/dialog";
import {CompanyService} from "../../_services/company.service";
import {ToastrService} from "ngx-toastr";
import {VehicleService} from "../../_services/vehicle.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Company} from "../../models/company";
import {Fleet} from "../../models/fleet";
import {Vehicle} from "../../models/vehicle";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
    selector: 'fleet',
    templateUrl: './fleet.component.html',
    styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
    dataSource: any = [];
    vehiclesToBeShown: any = [];
    vehicleList: any = [];
    public unAssignedVehicles: Vehicle[] = [];
    public relatedVehicles: Vehicle[] = [];
    public toBeDeleted: any;
    public toBeEdited: any;
    private dialogRef: any;
    public formGroup: FormGroup;
    public page = 0;
    public size = 5;
    public totalElements;
    public fleet: Fleet;
    public companyId: string = '5faa6d2ad2a9b8244ae2a8e5';

    displayedColumns = ['position','name', 'vehicles', 'actions'];
    vehiclesColumns = ['position','name', 'consumption', 'maxCapacity', 'enginePower'];

    constructor(public dialog: MatDialog,
                private tokenStorageService: TokenStorageService,
                private companyService:CompanyService,
                private fleetService: FleetService,
                private toastrService: ToastrService,
                private formBuilder: FormBuilder,
                private vehicleService: VehicleService) {
    }

    company:Company
    ngOnInit() {
        this.companyId = this.tokenStorageService.getUser().id;
        this.companyService.getCompanyById(this.companyId).subscribe(data => {
            this.company=data;
        })
        // this.fleetService.getAllFleets('5f9fe121da05f82030e6288f').subscribe(data => {
        //   this.dataSource = data
        // })
        this.getPage(null);
        this.getVehicleListByCompanyId();
        this.formGroup = this.formBuilder.group({
            'name': [null],
            'vehicles': [null],
            'id': [null],
            'companyId': [null]
        });
    }

    getVehicleListByCompanyId() {
        this.vehicleService.getAllVehiclesByCompanyId(this.companyId).subscribe(vehicleList => {
            this.vehicleList = vehicleList
        })
    }

    getPage(event) {
        if (event != null) {
            this.size = event.pageSize;
            this.page = event.pageIndex;
        }
        this.fleetService.getPageFleet(this.companyId, this.page, this.size).subscribe(data => {
            this.dataSource = data.content;
            this.totalElements = data.totalElements;
        })
    }

    deleteFleet(id) {
        this.fleetService.deleteFleet(id).subscribe(data => {
            this.getPage(null);
            this.removeFleetIdFromVehicles();
            this.toastrService.success("Deleted successfully!")
        }, error => {
            this.toastrService.error("Cannot be deleted! " + error.message)
        })
    }

    removeFleetIdFromVehicles() {
        let toBeEditedVehicles: Vehicle [] = [];
        this.vehicleList.forEach(vehicle => {
            if (this.toBeDeleted.vehicleId.indexOf(vehicle.id)>=0) {
                vehicle.fleetId = null;
                toBeEditedVehicles.push(vehicle);
            }
        })

        this.vehicleService.updateVehicles(toBeEditedVehicles).subscribe(data => {
            this.getVehicleListByCompanyId();
        })
    }

    openDialog(element, templateRef) {
        this.toBeDeleted = element
        this.dialogRef = this.dialog.open(templateRef)
        this.formGroup.reset()
    }

    openAddDialog(templateRef) {
        this.dialogRef = this.dialog.open(templateRef)
        this.formGroup.reset()
        this.unAssignedVehicles = [];
        this.vehicleList.forEach(vehicle => {
            if (vehicle.fleetId == null) {
                this.unAssignedVehicles.push(vehicle);
            }
        })
    }

    createFleet(formValue) {
        let fleet: Fleet = new Fleet();
        fleet.name = formValue.name;
        let vehicleIdList = [];
        if (formValue.vehicles!=null) {
            for (let vehice of formValue.vehicles) {
                vehicleIdList.push(vehice.id)
            }
        }
        fleet.vehicleId = vehicleIdList;
        fleet.companyId = this.companyId;
        this.fleetService.addFleet(fleet).subscribe(createdFleet => {
            this.addFleetIdToVehicles(createdFleet.id, formValue.vehicles);
            this.getPage(null);
            this.toastrService.success("Fleet was added")
            this.dialog.closeAll()
        }, error => {
            this.toastrService.error("Fleet cannot be added! " + error.error)
        })
    }

    addFleetIdToVehicles(fleetId: string, vehicles: Vehicle[]) {
        if (vehicles != null) {
            vehicles.forEach(vehicle => {
                vehicle.fleetId = fleetId;
            })
        this.vehicleService.updateVehicles(vehicles).subscribe(data => {
            this.getVehicleListByCompanyId();
        })
    }
    }

    editFleet(element, templateRef) {
        this.relatedVehicles = [];
        this.vehicleList.forEach(vehicle => {
            if (vehicle.fleetId == null || vehicle.fleetId == element.id) {
                this.relatedVehicles.push(vehicle);
            }
        })
        this.toBeEdited = element;
        this.dialogRef = this.dialog.open(templateRef)
        let vehiclesToBePatched = []
        for (let vehicle of this.vehicleList) {
            if (this.toBeEdited.vehicleId.indexOf(vehicle.id) >= 0) {
                vehiclesToBePatched.push(vehicle)
            }
        }
        this.formGroup.patchValue({
                'id': this.toBeEdited.id,
                'name': this.toBeEdited.name,
                'vehicles': vehiclesToBePatched,
                'companyId': this.toBeEdited.companyId
            }
        )

    }

    submitEdit(formValue) {
        let fleet: Fleet = new Fleet();
        fleet.name = formValue.name;
        fleet.companyId = formValue.companyId;
        fleet.id = formValue.id;
        let vehicleIdList = [];
        for (let vehice of formValue.vehicles) {
            vehicleIdList.push(vehice.id)
        }
        fleet.vehicleId = vehicleIdList;
        this.fleetService.addFleet(fleet).subscribe(data => {
            this.updateVehiclesAfterEditingFleet(fleet);
            this.getPage(null);
            this.toastrService.success("Fleet was edited")
            this.dialog.closeAll()
        }, error => {
            this.toastrService.error("Fleet cannot be edited! " + error.error)
        })

    }

    updateVehiclesAfterEditingFleet(editedFleet) {
        this.relatedVehicles.forEach(vehicle => {
            if (editedFleet.vehicleId.indexOf(vehicle.id)>=0) {
                vehicle.fleetId = this.toBeEdited.id;
            } else {
                vehicle.fleetId = null;
            }
        })
        this.vehicleService.updateVehicles(this.relatedVehicles).subscribe(data => {
            this.getVehicleListByCompanyId();
        })
    }

    showVehicles(vehicleIdList, template) {
        this.dialogRef = this.dialog.open(template);
        this.getVehiclesByIdList(vehicleIdList);
    }

    getVehiclesByIdList(list) {
        this.fleetService.getVehicles(list).subscribe(data => {
            this.vehiclesToBeShown = data
        })
    }

    closeDialog() {
        this.dialog.closeAll()
    }

}
