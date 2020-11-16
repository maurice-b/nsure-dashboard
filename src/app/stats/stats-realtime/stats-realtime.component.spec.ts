import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsRealtimeComponent } from './stats-realtime.component';

describe('StatsRealtimeComponent', () => {
  let component: StatsRealtimeComponent;
  let fixture: ComponentFixture<StatsRealtimeComponent>;

  beforeEach(async(() => {
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
