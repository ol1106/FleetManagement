import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver';

const URL='http://localhost:8082/fleet/'

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http:HttpClient) { }

  getAllDrivers(companyId:String,page:number,size:number): Observable<any>{
    return this.http.get(URL+`${companyId}`+'/drivers');
  }

  getDriverById(id:String):Observable<any>{
    return this.http.get(URL+'drivers/'+`${id}`);
  }
  addDriver(companyId:String,driver:Driver):Observable<any>{
    return this.http.post(URL+`${companyId}`+'/addDriver',driver);
  }
  updateDriver(id:String,driver:Driver):Observable<any>{
    return this.http.put(URL+'updateDriver/'+`${id}`,driver);
  }
  deleteDriver(companyId:String,id:String):Observable<any>{
    return this.http.delete(URL+`${companyId}`+'/deleteDriver/'+`${id}`);
  }
  deleteAllDrivers(companyId:String):Observable<any>{
    return this.http.delete(URL+`${companyId}`+'/deleteAllDrivers');
  }
}
