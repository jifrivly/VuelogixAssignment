import { Component, OnInit } from '@angular/core';

import { EmployeeModel } from "src/app/models/employee-model";

import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  employeeList: EmployeeModel[] = [];
  employeeListError: any;


  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getEmployeeList().subscribe(
      (result) => {
        // this.employeeList = result.data;
        this.employeeListError = null;
        result.data.forEach((employee, i: number) => {
          console.log(employee);
          this.employeeList[i] = new EmployeeModel(employee);
        });

      },
      (err) => {
        this.employeeListError = err;
        this.employeeList = null;
      });
  }



  viewWorkTime(object) {
    if (object.viewWorkTimeButton) {
      object.viewWorkTimeButton = false;
    } else {
      object.viewWorkTimeButton = true;
      object.calculateWorkTimes();
      // console.log(object.workTimes);


    }

  }





}
