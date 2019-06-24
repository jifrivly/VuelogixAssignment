import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  employeeData;
  employeeFetchError;
  checkedInOutButtonText = "CheckedIn";
  checkedMessage = null;
  id = "5d0f088f29becb1c4fe5c90b";

  firstDay: number;
  workTimes = new Array;

  checkedInOutChangeError = null;

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.settingUp();
  }

  private settingUp() {
    this.employeeService.getEmployeeById(this.id).subscribe(
      (result) => {
        this.employeeData = result.data;
        this.employeeFetchError = null;

        this.firstDay = parseInt(this.employeeData.work.firstDay);
        // console.log(this.firstDay);
        // var d = new Date(this.firstDay);
        // console.log(d);


        this.calculateWorkTimes();

        if (this.employeeData.work.checked) {
          this.checkedInOutButtonText = "CheckedOut";
          this.checkedMessage = "You are checked In Click Below Button to check out...";

          this.calculateWorkTimes();
        } else {
          this.checkedInOutButtonText = "CheckedIn"
          this.checkedMessage = "You are checked Out Click Below Button to check in...";
        }
      },
      (err) => {
        this.employeeFetchError = err;
        this.employeeData = null;
      }
    );
  }

  checkedInOut() {
    this.employeeService.checkInOut(this.id).subscribe(
      (result) => {
        this.checkedInOutChangeError = null;
        this.settingUp();
      },
      (err) => {
        this.checkedInOutChangeError = err;
      }
    );
  }


  // calculating work time
  private calculateWorkTimes() {
    var workTimes: [] = this.employeeData.work.workTime;

    if (this.workTimes) {
      this.workTimes = [];
    }

    // console.log(workTimes);

    workTimes.forEach((t: any) => {
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
      this.workTimes.push(workString);

    });

  }


  // END class
}
