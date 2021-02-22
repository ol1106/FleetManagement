import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../models/company";

const url='http://localhost:8082/fleet/company'

const URL='http://localhost:8082/fleet/company/';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }



  public deleteCompany(id): Observable<any> {
    return this.http.delete(url + '/deleteById/' + id);
  }

  public editCompany(company:Company): Observable<any> {
    return this.http.put(url + '/update',company);
  }

  public getPageCompany(page:number,size:number): Observable<any> {
    return this.http.get(url + '/get/page/' + page + '/size/' + size);
  }
  addCompany(company:Company):Observable<any>{
    return this.http.post(URL+'add',company);
  }

  getAllCompanies(): Observable<any>{
    return this.http.get(URL+'get');
  }
  getCompanyById(id:String):Observable<any>{
    return this.http.get(URL+'getById/'+`${id}`);
  }

}
