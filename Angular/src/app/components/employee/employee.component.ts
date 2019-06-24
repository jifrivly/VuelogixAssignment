import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from 'src/app/services/employee.service';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  private loginForm: FormGroup;
  private email;
  private password;

  employeeData: any;
  loginError: any;
  serverError: any;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private _router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", { required: true }],
      password: ["", { required: true }]
    });
    this.email = this.loginForm.get("email");
    this.password = this.loginForm.get("password");
  }

  login() {
    if (this.email.value && this.password.value) {
      this.employeeService
        .login(this.loginForm.value)
        .subscribe(
          (result) => {
            console.log("Service returned data");
            if (result.success) {
              this.employeeData = result;
              this.loginError = null;
              this.serverError = null;
              this._router.navigate(["/employee/dashboard"]);
            } else {
              this.loginError = "Username and password not match...";
              this.employeeData = null;
              this.serverError = null;
            }
          },
          (err) => {
            this.serverError = err.message;
            this.employeeData = null;
            this.loginError = null;
          });
    } else {
      this.loginError = "please enter username and password"
    }
  }

  logout() {
    this._router.navigate([""]);
  }

}
