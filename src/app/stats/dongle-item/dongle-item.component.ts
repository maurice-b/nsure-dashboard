import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DongleInterface} from '@app-shared/services/device/dongle.interface';

@Component({
  selector: 'app-dongle-item',
  templateUrl: './dongle-item.component.html',
  styleUrls: ['./dongle-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DongleItemComponent implements OnInit {
  private dongleItemCollection: DongleInterface[] | null = [];

  @Input()
  public set data(value: DongleInterface[] | null) {
    this.dongleItemCollection = value;

    if (this.dongleItemCollection?.length === 1) {
      this.selectedDongleId = this.dongleItemCollection[0].dongleID;
      this.onSelect();
    }
  }

  public get data(): DongleInterface[] | null {
    return this.dongleItemCollection;
  }

  @Output()
  public selected: EventEmitter<DongleInterface> = new EventEmitter<DongleInterface>();

  public selectedDongleId = '';

  public constructor() {
  }

  public ngOnInit(): void {
  }

  public onSelect(): void {
    const foundItem = this.data?.find(d => d.dongleID === this.selectedDongleId);
    if (foundItem !== undefined) {
      this.selected.emit(foundItem);
    }
  }
}
