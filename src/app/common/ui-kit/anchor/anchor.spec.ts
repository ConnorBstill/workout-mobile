import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnchorComponent } from './anchor.component';

describe('AnchorComponent', () => {
  let component: AnchorComponent;
  let fixture: ComponentFixture<AnchorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AnchorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
