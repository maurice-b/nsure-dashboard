import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DongleItemDetailComponent } from './dongle-item-detail.component';

describe('DongleItemDetailComponent', () => {
  let component: DongleItemDetailComponent;
  let fixture: ComponentFixture<DongleItemDetailComponent>;

  beforeEach(async(() => {
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
