import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeModel } from 'src/app/models/employee-model';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  id = "5d0f088f29becb1c4fe5c90b";
  employee: EmployeeModel;

  checkedInOutButtonText = "CheckedIn";
  checkedMessage = null;
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
        this.employee = new EmployeeModel(result.data);
        this.employee.calculateWorkTimes();

        if (this.employee.data.work.checked) {
          this.checkedInOutButtonText = "CheckedOut";
          this.checkedMessage = "You are checked In Click Below Button to check out...";

          this.employee.calculateWorkTimes();

        } else {
          this.checkedInOutButtonText = "CheckedIn"
          this.checkedMessage = "You are checked Out Click Below Button to check in...";
        }
      },
      (err) => {
        this.employee = new EmployeeModel(null, err);
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





  // END class
}
