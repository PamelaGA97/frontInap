import { TestBed } from '@angular/core/testing';

import { FacultyCoursesStorageService } from './faculty-courses-storage.service';

describe('FacultyCoursesStorageService', () => {
  let service: FacultyCoursesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyCoursesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
