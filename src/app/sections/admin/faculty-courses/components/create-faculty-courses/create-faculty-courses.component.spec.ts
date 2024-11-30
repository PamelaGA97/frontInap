import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFacultyCoursesComponent } from './create-faculty-courses.component';

describe('CreateFacultyCoursesComponent', () => {
  let component: CreateFacultyCoursesComponent;
  let fixture: ComponentFixture<CreateFacultyCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFacultyCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFacultyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
