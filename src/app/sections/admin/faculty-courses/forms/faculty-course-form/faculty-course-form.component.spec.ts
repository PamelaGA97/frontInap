import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCourseFormComponent } from './faculty-course-form.component';

describe('FacultyCourseFormComponent', () => {
  let component: FacultyCourseFormComponent;
  let fixture: ComponentFixture<FacultyCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyCourseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
