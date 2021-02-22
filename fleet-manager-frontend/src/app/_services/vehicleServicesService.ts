import { catchError, map } from 'rxjs/operators';
import { VehicleServices } from '../models/vehicle-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {FormGroup, FormControl, Validators}  from '@angular/forms';


@Injectable({
    providedIn: 'root'
})

export class ApiVehicleServices{

    apiUrl:String  = 'http://localhost:8082/fleet/';
    apiUrl2:String  = 'http://localhost:8082/fleet';
    
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }
    
    public getAllByPage(page:number, size:number):Observable<any> {
      return this.http.get(`${this.apiUrl}` + 'getServices' + '/page/' + page + '/size/' + size);
     }
  


    //Get all services by VehicleId
      getAll(): Observable<any> {
        return this.http.get(`${this.apiUrl}/allService`);
      }

    //Get services by vehicleId and id
      getById(id:String): Observable<any>{
          let endpoint= this.apiUrl2+'/find/'+`${id}`;
          return this.http.get(endpoint, {headers: this.headers}).pipe(map((res: Response)=>{
              return res || {}
          }),
          catchError(this.errorMgmt)
          )
      }

      //Add Service
      addVehicleService(data: VehicleServices): Observable<any>{
          let endpoint = `${this.apiUrl2}/addService`;
          return this.http.post(endpoint, data).pipe(catchError(this.errorMgmt));
        }

       //Update Service
       updateService(data: VehicleServices): Observable<any>{
           let endpoint =`${this.apiUrl}`+'updateService';
           return this.http.put(endpoint,data, {headers: this.headers}).pipe(catchError(this.errorMgmt));
          }

       //Delete Service
       deleteService(id): Observable<any>{
        let endpoint = `${this.apiUrl}`+'deleteService/'+`${id}`;
        return this.http.delete(endpoint).pipe(catchError(this.errorMgmt));
       }
       
       // Error handling 
        errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
        } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }


}
