import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsHistoryComponent } from './stats-history.component';

describe('StatsHistoryComponent', () => {
  let component: StatsHistoryComponent;
  let fixture: ComponentFixture<StatsHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
