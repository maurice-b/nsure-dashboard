import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RealtimeDataInterface} from '@app-shared/services/device/realtime-data.interface';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-stats-realtime',
  templateUrl: './stats-realtime.component.html',
  styleUrls: ['./stats-realtime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsRealtimeComponent implements OnInit, OnDestroy {

  public realTimeData: RealtimeDataInterface[] = [];

  @Input()
  public set data(value: RealtimeDataInterface | undefined | null) {
    if (value === undefined || value === null) {
      return;
    }
    
    this.realTimeData.push(value);

    // Create chart data
    this.lineChartLabels.push(value.date.toString());

    // Consumption
    if (this.lineChartData !== undefined && this.lineChartData[0] !== undefined && this.lineChartData[0].data !== undefined) {
      this.lineChartData[0].data.push(value.consumption);
    }

    // Delivery
    if (this.lineChartData !== undefined && this.lineChartData[1] !== undefined && this.lineChartData[1].data !== undefined) {
      this.lineChartData[1].data.push(value.consumption);
    }
  }

  public lineChartData: ChartDataSets[] = [
    {
      label: 'Consumption',
      data: []
    },
    {
      label: 'Delivery',
      data: []
    }
  ];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
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
        // ticks: {
        //   fontSize: 2,
        //   // fontColor: 'transparent'
        // }
      }],
      yAxes: [{
        display: true,
        ticks: {
          display: true
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
      display: true
    },
    layout: {
      padding: 2
    },
    animation: {
      duration: 0
    }
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: `rgba(0, 0, 0, 0)`,
      borderColor: `rgba(36, 255, 0, .55)`,

      pointBackgroundColor: `rgba(36, 255, 0, 0.75)`,
      pointBorderColor: `rgba(36, 255, 0, 1)`,
      pointHoverBackgroundColor: `rgba(36, 255, 0, 1)`,
      pointHoverBorderColor: `rgba(36, 255, 0, .55)`,
    }, {
      backgroundColor: `rgba(0, 0, 0, 0)`,
      borderColor: `rgba(0, 42, 255, .55)`,

      pointBackgroundColor: `rgba(0, 42, 255, 0.75)`,
      pointBorderColor: `rgba(0, 42, 255, 1)`,
      pointHoverBackgroundColor: `rgba(0, 42, 255, 1)`,
      pointHoverBorderColor: `rgba(0, 42, 255, .55)`,
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
