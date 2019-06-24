import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private loginForm: FormGroup;
  private email;
  private password;

  adminData: any;
  loginError: any;
  serverError: any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
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
      this.adminService
        .login(this.loginForm.value)
        .subscribe(
          (result) => {
            console.log("Service returned data");
            if (result.success) {
              this.adminData = result;
              this.loginError = null;
              this.serverError = null;
              this._router.navigate(["/admin/dashboard"]);
            } else {
              this.loginError = "Username and password not match...";
              this.adminData = null;
              this.serverError = null;
            }
          },
          (err) => {
            this.serverError = err.message;
            this.adminData = null;
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
