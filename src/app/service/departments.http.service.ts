import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, concatMap, forkJoin, Subject, takeUntil } from 'rxjs';
import { IDepartments, RootObject } from '../models/departments.model';
import { IArtworkObject } from '../models/artwork.model';
@Injectable({
  providedIn: 'root',
})
export class DepartmentsHttpService {
  public departments: any = [];
  artworks: any = [];
  allDepartments: Subject<Array<IDepartments>> = new Subject();
  allArtworks: Subject<Array<IArtworkObject>> = new Subject();
  displayModals: Subject<any> = new Subject();
  searchInput: BehaviorSubject<string> = new BehaviorSubject('*');
  private readonly onDestroy = new Subject<void>();

  constructor(private httpClient: HttpClient) {}

  BASE_URL: string = 'https://collectionapi.metmuseum.org/public/collection/v1';

  /**
   * Fetch data for the departments (display name & ID)
   */
  getDepartments() {
    this.httpClient
      .get<IDepartments>(`${this.BASE_URL}/departments`)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((departments: any) => {
        this.allDepartments.next(departments.departments);
      });
    // pass data to departments observable stream
    this.allDepartments
      .pipe(takeUntil(this.onDestroy))
      .subscribe((departments) => {
        this.searchInput.pipe(takeUntil(this.onDestroy)).subscribe((search) => {
          this.getAllArtworks(departments, search);
        });
      });
  }

  /**
   * Fetch artworks by department and pass them to artworks observable
   */
  getAllArtworks(departments: any, search: string) {
    for (let i = 0; i < departments.length; i++) {
      var params = new HttpParams()
        .set('hasImages', `${true}`)
        .set('q', search)
        .set('departmentId', `${departments[i].departmentId}`);
      this.httpClient
        .get<RootObject>(`${this.BASE_URL}/search`, { params })
        //concatMap inner observable (artworks id http call) with outer observable (department's objectIDs)
        .pipe(
          concatMap((response: any) => {
            const observables = response.objectIDs
              //Take only 15 object to display and to get its data
              .slice(0, 10)
              .map((objectID: number) => {
                return this.httpClient.get<IArtworkObject>(
                  `${this.BASE_URL}/objects/${objectID}`
                );
              });
            return forkJoin(observables);
          })
        )
        .pipe(takeUntil(this.onDestroy))
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
