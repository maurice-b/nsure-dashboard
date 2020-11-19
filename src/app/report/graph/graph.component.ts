import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {GraphItemInterface} from '@app-shared/interfaces/graph-item.interface';
import {BaseGraphComponent} from '@app-shared/component/base-graph/base-graph.component';
import {ReportDataInterface} from '@app-shared/services/report-data/report-data.interface';

@Component({
  selector: 'app-report-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent extends BaseGraphComponent<ReportDataInterface> {

  public itemCollection: GraphItemInterface[] = [
    {
      name: 'gas',
      color: `rgb(119, 0, 255)`,
      label: 'Gas'
    },
    {
      name: 'electricity',
      color: `rgb(21, 200, 0)`,
      label: 'Electricity'
    },
    {
      name: 'electricityHigh',
      color: `rgb(21, 255, 0)`,
      label: 'Electricity High'
    },
    {
      name: 'electricityLow',
      color: `rgb(21, 125, 0)`,
      label: 'Electricity Low'
    },
    {
      name: 'electricityDelivery',
      color: `rgb(255, 251, 0)`,
      label: 'Electricity Delivery'
    },
    {
      name: 'slumber',
      color: `rgb(0, 42, 255)`,
      label: 'Slumber'
    },
    {
      name: 'gasTarget',
      color: `rgb(119, 150, 255)`,
      label: 'Gas Target'
    },
    {
      name: 'electricityTarget',
      color: `rgb(21, 150, 255)`,
      label: 'Electricity Target'
    },
    {
      name: 'elapsed',
      color: `rgb(255, 153, 0)`,
      label: 'Elapsed'
    },
    {
      name: 'electricityProduction',
      color: `rgb(255, 0, 0)`,
      label: 'Electricity Production'
    },
  ];

}
