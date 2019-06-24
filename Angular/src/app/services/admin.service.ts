import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AdminInterface } from '../interfaces/admin.interface';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = "http://localhost:4545/";

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    console.log("Service called and worked");
    return this.http.post<any>(this.url + "admin/login", credentials)
      .pipe(catchError(this.errorHandler));
  }

  public getEmployeeList(): Observable<any> {
    return this.http.get<any>(this.url + "employee/list")
      .pipe(catchError(this.errorHandler));
  }

  getEmployeeById(id): Observable<any> {
    return this.http.get<any>(this.url + "employee/" + id)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log("Client side error : " + errorResponse.error.message);
      return throwError(errorResponse.error.message || "Error occurred");

    } else {
      console.log("Server side error : " + JSON.stringify(errorResponse));
      return throwError(errorResponse || "Error occurred");
    }
  }

}
