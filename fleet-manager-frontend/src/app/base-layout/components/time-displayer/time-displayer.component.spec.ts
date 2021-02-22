import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDisplayerComponent } from './time-displayer.component';

describe('TimeDisplayerComponent', () => {
  let component: TimeDisplayerComponent;
  let fixture: ComponentFixture<TimeDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
