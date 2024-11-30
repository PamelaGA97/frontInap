import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCoursesListComponent } from './faculty-courses-list.component';

describe('FacultyCoursesListComponent', () => {
  let component: FacultyCoursesListComponent;
  let fixture: ComponentFixture<FacultyCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyCoursesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
