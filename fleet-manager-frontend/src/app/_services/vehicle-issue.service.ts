import { VehicleIssue } from './../models/vehicle-issue';
import { catchError, map } from 'rxjs/operators';
import { VehicleServices } from '../models/vehicle-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {FormGroup, FormControl, Validators}  from '@angular/forms';


@Injectable({
    providedIn: 'root'
})

export class ApiVehicleIssues{

    
    apiUrl:String  = 'http://localhost:8082/fleet/';
    apiUrl2:String  = 'http://localhost:8082/fleet/';
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }
        //Get all issues by VehicleId
        
    public getAll( page:number, size:number):Observable<any> {
    return this.http.get(`${this.apiUrl}` + '/allIssues/' +'get' + '/page/' + page + '/size/' + size );
   }

    // public getAll( page:number, size:number): Observable<any> {
    //     return this.http.get(`${this.apiUrl}` + '/allIssues' + '/page/' + page + '/size/' + size);
    //   }

      //
    
      //Get issue by id
      getById(id:String): Observable<any>{
        let endpoint= this.apiUrl2 +'findIssues/'+`${id}`;
        return this.http.get(endpoint, {headers: this.headers}).pipe(map((res: Response)=>{
            return res || {}
        }),
        catchError(this.errorMgmt)
        )
    }

    //Add Issue
    addVehicleIssue(vehicleId:String, data: VehicleIssue): Observable<any>{
        let endpoint = `${this.apiUrl}` +`${vehicleId}`+ '/addIssue' ;
        return this.http.post(endpoint, data).pipe(catchError(this.errorMgmt));
      }

      //Update Issue
      updateIssue(data: VehicleIssue, vehicleId:String): Observable<any>{
        let endpoint =`${this.apiUrl}`+`${vehicleId}` +'/updateIssue';
        return this.http.put(endpoint,data, {headers: this.headers}).pipe(catchError(this.errorMgmt));
       }

       //Delete Issue
       deleteIssue(vehicleId: String, id:String): Observable<any>{
        let endpoint = `${this.apiUrl}`+`${vehicleId}`+'/deleteIssue/'+`${id}`;
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