import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  api = "http://localhost:3000/testdata";

  //Get all  Data
  getAllData(columnn: string, order: string):Observable<any>{
    return this.http.get(`${this.api}/all/${columnn}/${order}`);
  }

  //Insert Data
  insert(testdata: any):Observable<any>{
    return this.http.post(`${this.api}`, testdata)
  }

  //Update Data
  update(id: any, testdata: any):Observable<any>{
    return this.http.put(`${this.api}/${id}`, testdata);
  }

  //Delete Data
  delete(id : any):Observable<any>{
    return this.http.delete(`${this.api}/${id}`);
  }
}
