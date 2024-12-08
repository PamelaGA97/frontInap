import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsDetailComponent } from './professors-detail.component';

describe('ProfessorsDetailComponent', () => {
  let component: ProfessorsDetailComponent;
  let fixture: ComponentFixture<ProfessorsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
