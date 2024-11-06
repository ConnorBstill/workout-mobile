import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyWorkoutsComponent } from './my-workouts.component';

describe('MyWorkoutsComponent', () => {
  let component: MyWorkoutsComponent;
  let fixture: ComponentFixture<MyWorkoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyWorkoutsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MyWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
