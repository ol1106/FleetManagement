import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleClass } from '../models/vehicle-class';
const Url = 'http://localhost:8082/fleet/vehicleClass/';

@Injectable({
  providedIn: 'root'
})

export class VehicleClassService {

  constructor(private http: HttpClient) { }

  getAllVehicleClass():Observable<any>{
    return this.http.get(Url+'all');
  }

  oneVehicleClass(id: String):Observable<any>{
    return this.http.get(Url+`/${id}`)
  }
  addNewVehicleClass(vehicle: VehicleClass):Observable<any>{
    return this.http.post(Url+'add',vehicle)
  }

  deleteVehicleCLass(id:String):Observable<any>{
    return this.http.delete(Url+'delete/'+`${id}`)
  }

}
