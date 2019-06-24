import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = "http://localhost:4545/";


  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post("http://localhost:4545/employee/login", credentials)
      .pipe(catchError(this.errorHandler));
  }

  checkInOut(id): Observable<any> {
    return this.http.get("http://localhost:4545/employee/checkInOut/" + id)
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
