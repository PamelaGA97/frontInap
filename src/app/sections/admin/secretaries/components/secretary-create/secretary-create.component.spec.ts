import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryCreateComponent } from './secretary-create.component';

describe('SecretaryCreateComponent', () => {
  let component: SecretaryCreateComponent;
  let fixture: ComponentFixture<SecretaryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretaryCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretaryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
