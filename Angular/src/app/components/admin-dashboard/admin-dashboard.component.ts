import { Component, OnInit } from '@angular/core';

import { EmployeeModel } from "src/app/models/employee-model";

import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  employeeList: EmployeeModel[];
  employeeListError: any


  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getEmployeeList().subscribe(
      (result) => {
        this.employeeList = result.data;
        this.employeeListError = null;
        result.forEach((employee) => {
          var  = new EmployeeModel(employee, false, null, null);
        });
      },
      (err) => {
        this.employeeListError = err;
        this.employeeList = null;
      });
  }


  viewWorkTime(id) {
    if (this.viewWorkTimeButton) {
      this.viewWorkTimeButton = false;
    } else {
      this.viewWorkTimeButton = true;
      this.adminService.getEmployeeById(id).subscribe(
        (result) => {
          this.employee = result;

          var workTimes = this.calculateWorkTimes(result.work.workTime)
        },
        (err) => {
          this.employeeError = err;
        }
      );
    }

  }



  // calculating work time
  private calculateWorkTimes(workTime: []): [string] {
    var workTimes: [string];

    // console.log(workTimes);

    workTime.forEach((t: any) => {
      // var time = t;
      // console.log("Time : " + t);
      var time = Math.round(t / 1000);
      // console.log("Total Seconds : " + time);


      var seconds = time % 60;
      // console.log("Seconds : " + seconds);

      time = Math.round(time / 60);
      var minutes = time % 60;
      // console.log("Minutes : " + minutes);

      time = Math.round(time / 60);
      var houres = time % 60;
      // console.log("Houres : " + houres);

      var workString: string = houres + "h " + minutes + "m " + seconds + "s";
      workTimes.push(workString);

    });

    return workTimes;
  }



}
