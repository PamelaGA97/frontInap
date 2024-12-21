import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudenToCourseFormComponent } from './add-studen-to-course-form.component';

describe('AddStudenToCourseFormComponent', () => {
  let component: AddStudenToCourseFormComponent;
  let fixture: ComponentFixture<AddStudenToCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudenToCourseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudenToCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
