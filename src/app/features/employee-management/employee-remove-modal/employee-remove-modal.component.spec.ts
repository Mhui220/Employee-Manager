import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRemoveModalComponent } from './employee-remove-modal.component';

describe('EmployeeRemoveModalComponent', () => {
  let component: EmployeeRemoveModalComponent;
  let fixture: ComponentFixture<EmployeeRemoveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRemoveModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRemoveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
