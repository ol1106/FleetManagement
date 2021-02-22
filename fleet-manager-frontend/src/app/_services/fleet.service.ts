import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fleet} from "../models/fleet";
import {Vehicle} from "../models/vehicle";

const url='http://localhost:8082/fleet/vehicleFleet'

@Injectable({
  providedIn: 'root'
})

export class FleetService {

  constructor(private http:HttpClient) { }

  public getAllFleetsByCompanyId(companyId:String): Observable<any> {
    return this.http.get(url + companyId +'/get');
  }

  public getAllFleets(): Observable<any> {
    return this.http.get(url + '/getAll');
  }

  public deleteFleet(id): Observable<any> {
    return this.http.delete(url + '/deleteById/' + id);
  }

  public addFleet(fleet:Fleet): Observable<any> {
    return this.http.post(url + '/add', fleet);
  }



  public getPageFleet(companyId: string, page:number,size:number): Observable<any> {
    return this.http.get(url + '/get/companyId/' + companyId + '/page/' + page + '/size/' + size);
  }

  public getVehicles(idList:string[]): Observable<any> {
    return this.http.post('http://localhost:8082/fleet/vehicleList',idList);
  }
}
