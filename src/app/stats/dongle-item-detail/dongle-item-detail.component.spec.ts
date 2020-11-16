import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DongleItemDetailComponent } from './dongle-item-detail.component';

describe('DongleItemDetailComponent', () => {
  let component: DongleItemDetailComponent;
  let fixture: ComponentFixture<DongleItemDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DongleItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DongleItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
