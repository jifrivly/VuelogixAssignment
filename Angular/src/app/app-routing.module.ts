import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: "employee", component: EmployeeComponent },
  { path: "admin/dashboard", component: AdminDashboardComponent },
  { path: "employee/dashboard", component: EmployeeDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
