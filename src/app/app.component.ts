import { Component, OnInit } from '@angular/core';
import { IDepartments } from './models/departments.model';
import { DepartmentsHttpService } from './service/departments.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public departments: IDepartments[] = [];

  constructor(private departmentsHttpService:DepartmentsHttpService) {}

  ngOnInit() {
    this.departmentsHttpService.allDepartments.subscribe(departments=>{
      this.departments=departments
    })
    this.departmentsHttpService.getObjectsIDs()
  }
}
