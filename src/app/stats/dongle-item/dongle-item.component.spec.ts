import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DongleItemComponent } from './dongle-item.component';

describe('DongelItemComponent', () => {
  let component: DongleItemComponent;
  let fixture: ComponentFixture<DongleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DongleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DongleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
