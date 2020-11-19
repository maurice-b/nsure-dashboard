import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ReportDataInterface} from '@app-shared/services/report-data/report-data.interface';
import {DongleInterface} from '@app-shared/services/device/dongle.interface';
import {select, Store} from '@ngrx/store';
import {actions as DeviceActions, selector as DeviceSelector, state as DeviceState} from '@app-shared/state/device';
import {actions as ReportDataActions, selector as ReportDataSelector, state as ReportDataState} from '@app-shared/state/report-data';
import {filter, takeUntil} from 'rxjs/operators';
import {DateTime} from 'luxon';
import {ReportDateTimeIndicatorType, ReportType} from '@app-shared/types';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {nameOf} from '@app-shared/util';
import {GraphItemInterface} from '@app-shared/interfaces/graph-item.interface';

interface ReportDataSettingInterface {
  reportType: ReportType;
  reportDateTimeIndicatorType: ReportDateTimeIndicatorType;
  dateRange: Date[] | undefined;
  startDateTime: Date | undefined;
  endDateTime: Date | undefined;
}

@Component({
  selector: 'app-report-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  constructor(
    private deviceStore: Store<DeviceState.DeviceStateInterface>,
    private reportDataStore: Store<ReportDataState.ReportDataStateInterface>,
  ) {
  }

  public devices$: Observable<DongleInterface[]> | undefined;
  private deviceDestroy$ = new Subject();

  private reportDataDestroy$ = new Subject();
  public reportData$: Observable<ReportDataInterface[] | undefined> | undefined;

  private dongleId: string | undefined;

  public model: ReportDataSettingInterface = {
    reportType: 'amount',
    reportDateTimeIndicatorType: 'hour',
    dateRange: [
      DateTime.local().minus({days: 4}).toJSDate(),
      DateTime.local().toJSDate()
    ],
    startDateTime: undefined,
    endDateTime: undefined
  };
  public fields: FormlyFieldConfig[] = [];
  public form = new FormGroup({});

  private static settingFields(): FormlyFieldConfig[] {

    const reportTypes: { id: ReportType, label: string }[] = [
      {
        id: 'usage',
        label: 'Usage'
      }, {
        id: 'amount',
        label: 'Amount',
      }, {
        id: 'cost',
        label: 'Cost'
      }
    ];

    const reportDateTimeIndicatorTypes: { id: ReportDateTimeIndicatorType, label: string }[] = [
      {
        id: 'year',
        label: 'Year'
      }, {
        id: 'quarter',
        label: 'Quarter',
      }, {
        id: 'month',
        label: 'Month'
      }, {
        id: 'week',
        label: 'Week'
      }, {
        id: 'day',
        label: 'Day'
      }, {
        id: 'hour',
        label: 'Hour'
      }
    ];


    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            key: nameOf((_: ReportDataSettingInterface) => _.reportType),
            type: 'select',
            validation: {
              show: true
            },
            templateOptions: {
              label: 'Report type',
              options: reportTypes,
              valueProp: 'id',
              labelProp: 'label',
              required: true
            }
          },
          {
            className: 'col-4',
            key: nameOf((_: ReportDataSettingInterface) => _.reportDateTimeIndicatorType),
            type: 'select',
            validation: {
              show: true
            },
            templateOptions: {
              label: 'Report date time indicator type',
              options: reportDateTimeIndicatorTypes,
              valueProp: 'id',
              labelProp: 'label',
              required: true
            }
          },
          {
            className: 'col-4',
            key: nameOf((_: ReportDataSettingInterface) => _.dateRange),
            type: 'daterangepicker',
            validation: {
              show: true
            },
            templateOptions: {
              label: 'Start and end date',
              required: true,
              // Custom datetime properties
              // minDate: momentNs()
              //   .set({ hour: 0, minute: 0, second: 0 })
              //   .subtract(6, 'months'),
              maxDate: DateTime.local()
            }
          }
        ]
      }
    ];
  }

  ngOnInit(): void {
    this.setStartAndEndDateTime();

    this.devices$ = this.deviceStore.pipe(
      select(DeviceSelector.getData),
      filter(data => data !== undefined),
      takeUntil(this.deviceDestroy$)
    );

    this.deviceStore.pipe(
      select(DeviceSelector.getSelected),
      filter(data => data !== undefined && data.dongleID !== undefined),
      takeUntil(this.deviceDestroy$)
    ).subscribe(data => {
      if (data?.dongleID === undefined) {
        return;
      }

      this.dongleId = data.dongleID;

      this.loadReportData();
    });

    this.reportData$ = this.reportDataStore.pipe(
      select(ReportDataSelector.getData),
      filter(data => data !== undefined && data.length > 0),
      takeUntil(this.reportDataDestroy$)
    );

    this.deviceStore.dispatch(new DeviceActions.Load());

    this.fields = OverviewComponent.settingFields();
  }

  public ngOnDestroy(): void {
    this.deviceDestroy$.next();
    this.deviceDestroy$.complete();

    this.reportDataDestroy$.next();
    this.reportDataDestroy$.complete();
  }

  public onDeviceSelected($event: DongleInterface): void {
    this.deviceStore.dispatch(new DeviceActions.SetSelectedDevice($event.dongleID));
  }

  private loadReportData(): void {
    if (this.model.startDateTime === undefined || this.model.endDateTime === undefined) {
      return;
    }

    const startDateTime = DateTime.fromJSDate(this.model.startDateTime).toUTC();
    const endDateTime = DateTime.fromJSDate(this.model.endDateTime).toUTC();

    const diffInSeconds = endDateTime.toSeconds() - startDateTime.toSeconds();
    if (diffInSeconds === undefined || diffInSeconds === 0 || this.dongleId === undefined) {
      return;
    }

    this.reportDataStore.dispatch(new ReportDataActions.Load(
      this.dongleId,
      this.model.reportType,
      this.model.reportDateTimeIndicatorType,
      startDateTime,
      endDateTime
    ));
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.loadReportData();
  }

  public onFormChange(): void {
    this.setStartAndEndDateTime();
  }

  private setStartAndEndDateTime(): void {
    if (this.model.dateRange === undefined) {
      return;
    }

    this.model.startDateTime = this.model.dateRange[0];
    this.model.endDateTime = this.model.dateRange[1];
  }
}
