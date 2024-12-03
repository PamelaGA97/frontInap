import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecretaryComponent } from './edit-secretary.component';

describe('EditSecretaryComponent', () => {
  let component: EditSecretaryComponent;
  let fixture: ComponentFixture<EditSecretaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSecretaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSecretaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
