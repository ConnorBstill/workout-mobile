import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewWorkoutComponent } from './view-workout.component';

describe('ViewWorkoutComponent', () => {
  let component: ViewWorkoutComponent;
  let fixture: ComponentFixture<ViewWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewWorkoutComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
