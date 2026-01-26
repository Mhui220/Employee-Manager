import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XssDemo } from './xss-demo';

describe('XssDemo', () => {
  let component: XssDemo;
  let fixture: ComponentFixture<XssDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XssDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XssDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
