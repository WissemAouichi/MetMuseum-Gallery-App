import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { concatMap, forkJoin, Observable, Subject, switchMap } from 'rxjs';

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

  constructor(private httpClient: HttpClient) {
    this.getDepartments();
  }

  BASE_URL: string = 'https://collectionapi.metmuseum.org/public/collection/v1';

  getDepartments() {
    this.httpClient
      .get<any>(`${this.BASE_URL}/departments`)
      .subscribe((departments: any) => {
        this.allDepartments.next(departments.departments);
      });
    this.allDepartments.subscribe((departments) => {
      this.getAllArtworks(departments);
    });
  }

  getObjectsIDs() {}

  getAllArtworks(departments: any) {
    for (let i = 0; i < departments.length; i++) {
      var params = new HttpParams()
        .set('departmentIds', `${departments[i].departmentId}`);
      this.httpClient
        .get(`${this.BASE_URL}/objects`, { params })
        .pipe(
          concatMap((response: any) => {
            const observables = response.objectIDs.slice(0,15).map((objectID: number) => {
              return this.httpClient.get(
                `${this.BASE_URL}/objects/${objectID}`
              );
            });
            return forkJoin(observables);
          })
        )
        .subscribe({
          next: (arts: any) => {
            console.log('arts by department', arts);
          },
          complete: () => {},
          error:()=>console.error("getAllArtworks service error")
        });
    }
  }
}
