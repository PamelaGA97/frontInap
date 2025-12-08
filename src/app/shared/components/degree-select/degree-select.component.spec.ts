import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeSelectComponent } from './degree-select.component';

describe('DegreeSelectComponent', () => {
  let component: DegreeSelectComponent;
  let fixture: ComponentFixture<DegreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegreeSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
