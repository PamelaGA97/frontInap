import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySelectComponent } from './faculty-select.component';

describe('FacultySelectComponent', () => {
  let component: FacultySelectComponent;
  let fixture: ComponentFixture<FacultySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultySelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
