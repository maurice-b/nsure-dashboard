import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RealtimeDataInterface} from '@app-shared/services/device/realtime-data.interface';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-stats-history',
  templateUrl: './stats-history.component.html',
  styleUrls: ['./stats-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsHistoryComponent implements OnInit, OnDestroy {

  public realTimeData: RealtimeDataInterface[] = [];

  @Input()
  public set data(value: RealtimeDataInterface[] | undefined | null) {
    if (value === undefined || value === null) {
      return;
    }

    this.realTimeData = [...value];

    // Create chart data
    this.lineChartLabels = this.realTimeData.map((data) => data.date.toString());

    this.lineChartData = [];
    this.lineChartData.push({
      data: this.realTimeData.map(d => d.consumption),
      label: 'Consumption'
    });
    this.lineChartData.push({
      data: this.realTimeData.map(d => d.delivery),
      label: 'Delivery'
    });
  }

  public lineChartData: ChartDataSets[] = [];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {minute: 'HH:mm'},
          // round: 'day'
          tooltipFormat: 'll HH:mm'
        },
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent'
        }
      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false
        }
      }]
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 3,
        backgroundColor: 'rgba(0, 180,0,1)'
      }
    },
    legend: {
      display: false
    },
    layout: {
      padding: 2
    }
  };

  // public lineChartOptions: ChartOptions = {
  //   responsive: true,
  //
  //   scales: {
  //     xAxes: [{
  //
  //       type: 'time',
  //       time: {
  //         displayFormats: {minute: 'HH:mm'},
  //         // round: 'day'
  //         tooltipFormat: 'll HH:mm'
  //       },
  //     }]
  //   }
  //
  // };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(36,255,0,0.97)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,42,255,0.97)',
    },
  ];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType: ChartType = 'line';

  public constructor() {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {

  }

}
