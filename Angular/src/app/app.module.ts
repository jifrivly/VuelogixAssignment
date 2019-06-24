import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


// Forms 
import { ReactiveFormsModule } from '@angular/forms';


// Angular Material Designs
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule, MatButtonModule, MatButtonToggleModule, MatRadioModule } from "@angular/material";

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Services
import { AdminService } from './services/admin.service';
import { EmployeeService } from './services/employee.service';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { EmployeeModel } from "./models/employee-model";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    EmployeeComponent,
    EmployeeDashboardComponent,
    AdminDashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRadioModule,

  ],
  providers: [AdminService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
