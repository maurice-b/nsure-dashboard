import {Component, Input, OnInit} from '@angular/core';
import {DongleDataInterface} from '@app-shared/services/device/dongle-data.interface';

@Component({
  selector: 'app-dongle-item-detail',
  templateUrl: './dongle-item-detail.component.html',
  styleUrls: ['./dongle-item-detail.component.scss']
})
export class DongleItemDetailComponent implements OnInit {

  @Input()
  public data: DongleDataInterface | undefined | null = {
    electricityCost: 0,
    electricityCostLow: 0,
    electricityTarget: 0,
    firmwareVersion: '',
    gasCost: 0,
    gasTarget: 0,
    macAddress: '',
    name: '',
    solar: undefined,
    solarTarget: undefined,
    timezone: ''
  };

  public constructor() {
  }

  public ngOnInit(): void {
  }

}
