import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartPoint, ChartType} from 'chart.js';
import {GraphItemInterface} from '@app-shared/interfaces/graph-item.interface';
import {DateInterface} from '@app-shared/services/report-data/date.interface';

@Component({
  template: ''
})
export class BaseGraphComponent<T extends DateInterface> implements OnInit {
  @ViewChild(BaseChartDirective, {static: true})
  public chart: BaseChartDirective | undefined;

  public itemCollection: GraphItemInterface[] = [];

  @Input()
  public set data(values: T[] | null | undefined) {
    if (!values) {
      return;
    }

    this.clearLineChardData();

    for (let itemIndex = 0; this.itemCollection.length > itemIndex; itemIndex++) {
      const name = this.itemCollection[itemIndex].name;

      if (name !== undefined &&
        this.lineChartData !== undefined &&
        this.lineChartData[itemIndex] !== undefined &&
        this.lineChartData[itemIndex].data !== undefined) {

        const chartPoints: ChartPoint[] = [];
        for (let index = 0; values.length > index; index++) {
          if (values[index] === undefined && values[index][name as keyof T] === undefined) {
            continue;
          }

          chartPoints.push({
            x: values[index].date.toJSDate(),
            y: +values[index][name as keyof T]
          });
        }

        this.lineChartData[itemIndex].data = [...chartPoints];
      }
    }

    if (this.chart !== undefined) {
      this.chart.update();
    }
  }

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [{
        display: true,
        type: 'time',
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
  public lineChartColors: Color[] = [];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType: ChartType = 'line';

  public ngOnInit(): void {
    this.lineLabels();
    this.createChartColors();
  }

  private lineLabels(): void {
    for (let index = 0; this.itemCollection.length > index; index++) {
      this.lineChartData.push({
        label: this.itemCollection[index].label,
        data: []
      });
    }
  }

  private clearLineChardData(): void {
    if (this.lineChartData === undefined || this.lineChartData.length === 0) {
      return;
    }

    for (let index = 0; this.itemCollection.length > index; index++) {
      if (this.lineChartData[index] !== undefined) {
        this.lineChartData[index].data = [];
      }
    }
  }

  private createChartColors(): void {
    for (let index = 0; this.itemCollection.length > index; index++) {
      const color = this.itemCollection[index].color.replace('rgb(', '').replace(')', '');
      this.lineChartColors.push({
        backgroundColor: `rgba(${color}, 0.05)`,
        borderColor: `rgba(${color}, 0.55)`,

        pointBackgroundColor: `rgba(${color}, 0.75)`,
        pointBorderColor: `rgba(${color}, 1)`,
        pointHoverBackgroundColor: `rgba(${color}, 1)`,
        pointHoverBorderColor: `rgba(${color}, .55)`,
      });
    }
  }
}
