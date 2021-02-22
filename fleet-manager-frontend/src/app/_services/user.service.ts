import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FormGroup, FormControl}  from '@angular/forms';

const API_URL = 'http://localhost:8082/fleet/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  allAccess(): Observable<any> {
    return this.http.get(API_URL + 'home');
  }
  userAccess(): Observable<any>{
    return this.http.get(API_URL + 'main');
  }
  adminAccess(): Observable<any> {
    return this.http.get(API_URL + 'admin');
  }
}
