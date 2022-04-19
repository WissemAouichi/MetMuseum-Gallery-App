import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IDepartments } from './models/departments.model';
import { DepartmentsHttpService } from './service/departments.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public departments: IDepartments[] = [];
  private departmentsNames: Array<string> = [];
  public artworks: any = [];
  public searchText: string | undefined;
  displayDepartment: boolean = false;
  private readonly onDestroy = new Subject<void>();
  constructor(private departmentsHttpService: DepartmentsHttpService) {}

  ngOnInit() {
    this.departmentsHttpService.getDepartments();
    this.departmentsHttpService.allArtworks
      .pipe(takeUntil(this.onDestroy))
      .subscribe((artworks) => {
        this.artworks = artworks;
        //Pass the artworks to the right department
        let indexOfDepartment = this.departmentsNames.indexOf(
          this.artworks[0].department
        );
        indexOfDepartment !== -1
          ? (this.departments[indexOfDepartment].artworks = this.artworks)
          : null;
      });

    //Add artworks to
    this.departmentsHttpService.allDepartments
      .pipe(takeUntil(this.onDestroy))
      .subscribe((departments) => {
        this.departments = departments;
        this.departments.map((department) =>
          this.departmentsNames.push(department.displayName)
        );
      });
  }

  changeSearchInput(event: any) {
    this.departmentsHttpService.searchInput.next(event.toLowerCase());
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
