import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RealtimeDataInterface} from '@app-shared/services/realtime-data/realtime-data.interface';
import {GraphItemInterface} from '@app-shared/interfaces/graph-item.interface';
import {BaseGraphComponent} from '@app-shared/component/base-graph/base-graph.component';

@Component({
  selector: 'app-realtime-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent extends BaseGraphComponent<RealtimeDataInterface> {

  public itemCollection: GraphItemInterface[] = [
    {
      name: 'consumption',
      color: `rgb(119, 0, 255)`,
      label: 'Consumption (kWh)'
    },
    {
      name: 'delivery',
      color: `rgb(21, 200, 0)`,
      label: 'Delivery (kWh)'
    }
  ];
}
