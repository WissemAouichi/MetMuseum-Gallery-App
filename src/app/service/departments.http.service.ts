import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { concatMap, forkJoin, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsHttpService {
  public departments: any = [];
  artworks: any = [];
  artworksIDs: any = [];
  allArts: any = [];
  allDepartments: Subject<Array<any>> = new Subject();
  allArtworks: Subject<Array<any>> = new Subject();
  displayModals: Subject<any> = new Subject();

  constructor(private httpClient: HttpClient) {}

  BASE_URL: string = 'https://collectionapi.metmuseum.org/public/collection/v1';

  /**
   * Fetch data for the departments (display name & ID)
   */
  getDepartments() {
    this.httpClient
      .get<any>(`${this.BASE_URL}/departments`)
      .subscribe((departments: any) => {
        this.allDepartments.next(departments.departments);
      });
    // pass data to departments observable stream
    this.allDepartments.subscribe((departments) => {
      this.getAllArtworks(departments);
    });
  }

  /**
   * Fetch artworks by department and pass them to artworks observable
   */
  getAllArtworks(departments: any) {
    for (let i = 0; i < departments.length; i++) {
      var params = new HttpParams().set(
        'departmentIds',
        `${departments[i].departmentId}`
      );
      this.httpClient
        .get(`${this.BASE_URL}/objects`, { params })
        //concatMap inner observable (artworks id http call) with outer observable (department's objectIDs)
        .pipe(
          concatMap((response: any) => {
            const observables = response.objectIDs
              //Take only 15 object to display and to get its data
              .slice(0, 15)
              .map((objectID: number) => {
                return this.httpClient.get(
                  `${this.BASE_URL}/objects/${objectID}`
                );
              });
            return forkJoin(observables);
          })
        )
        .subscribe({
          next: (arts: any) => {
            this.artworks = [...this.artworks, ...arts];
            this.allArtworks.next(arts);
          },
          complete: () => {},
          error: () => console.error('getAllArtworks service error'),
        });
    }
    return this.artworks;
  }
}
