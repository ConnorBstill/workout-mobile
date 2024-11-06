import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreComponent } from './explore.component';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
