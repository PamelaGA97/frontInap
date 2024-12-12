import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCourseDetailComponent } from './faculty-course-detail.component';

describe('FacultyCourseDetailComponent', () => {
  let component: FacultyCourseDetailComponent;
  let fixture: ComponentFixture<FacultyCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyCourseDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
