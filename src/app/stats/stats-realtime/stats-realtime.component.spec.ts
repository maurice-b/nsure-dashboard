import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsRealtimeComponent } from './stats-realtime.component';

describe('StatsRealtimeComponent', () => {
  let component: StatsRealtimeComponent;
  let fixture: ComponentFixture<StatsRealtimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsRealtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
