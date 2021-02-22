import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicle} from "../models/vehicle";

const url='http://localhost:8082/fleet/vehicle/getAll'

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:HttpClient) { }

  public getAllVehicles(): Observable<any> {
    return this.http.get(url);
  }

  public getAllVehiclesByCompanyId(companyId: string): Observable<any> {
    return this.http.get('http://localhost:8082/fleet/' + companyId + '/vehicle/all');
  }

  public updateVehicles(vehicleList: Vehicle[]): Observable<any> {
    return this.http.put('http://localhost:8082/fleet/vehicles/update', vehicleList);
  }
}
