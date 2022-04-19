import { TestBed } from '@angular/core/testing';
import { DepartmentsHttpService } from './departments.http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

let service: DepartmentsHttpService;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [DepartmentsHttpService],
  });
  it('should be created', () => {
    const service: DepartmentsHttpService = TestBed.inject(
      DepartmentsHttpService
    );
    expect(service).toBeTruthy();
  });
});
