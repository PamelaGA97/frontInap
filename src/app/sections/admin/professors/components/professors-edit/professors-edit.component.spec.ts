import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsEditComponent } from './professors-edit.component';

describe('ProfessorsEditComponent', () => {
  let component: ProfessorsEditComponent;
  let fixture: ComponentFixture<ProfessorsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
