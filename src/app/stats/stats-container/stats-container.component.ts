import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {actions as DeviceActions, selector as DeviceSelector, state as DeviceState} from '@app-shared/state/device';
import {
  actions as DeviceDetailActions,
  selector as DeviceDetailSelector,
  state as DeviceDetailState
} from '@app-shared/state/device-detail';
import {
  actions as DeviceRealtimeActions,
  selector as DeviceRealtimeSelector,
  state as DeviceRealtimeState
} from '@app-shared/state/device-realtime';
import {filter, take, takeUntil} from 'rxjs/operators';
import {interval, Observable, Subject} from 'rxjs';
import {DongleInterface} from '@app-shared/services/device/dongle.interface';
import {DongleDataInterface} from '@app-shared/services/device/dongle-data.interface';
import {RealtimeDataInterface} from '@app-shared/services/device/realtime-data.interface';
import {DeviceTypeEnum} from '@app-shared/services/device/device-type.enum';

@Component({
  selector: 'app-stats-container',
  templateUrl: './stats-container.component.html',
  styleUrls: ['./stats-container.component.scss']
})
export class StatsContainerComponent implements OnInit, OnDestroy {
  public devices$: Observable<DongleInterface[]> | undefined;
  private deviceDestroy$ = new Subject();

  private deviceDetailDestroy$ = new Subject();
  public deviceDetails$: Observable<DongleDataInterface | undefined> | undefined;

  private deviceRealtimeDestroy$ = new Subject();
  public deviceRealtimeData$: Observable<RealtimeDataInterface> | undefined;

  private intervalValueDestroy$ = new Subject();


  public constructor(
    private deviceStore: Store<DeviceState.DeviceStateInterface>,
    private deviceDetailStore: Store<DeviceDetailState.DeviceDetailStateInterface>,
    private deviceRealtimeStore: Store<DeviceRealtimeState.DeviceRealtimeStateInterface>,
  ) {
  }

  public ngOnInit(): void {
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

      // Set interval
      const intervalValue = 10; // 10 seconds
      interval(intervalValue * 1000)
        .pipe(takeUntil(this.intervalValueDestroy$))
        .subscribe(() => this.deviceRealtimeStore.dispatch(new DeviceRealtimeActions.Load(DeviceTypeEnum.dongle, data?.dongleID)));
    });

    this.deviceDetails$ = this.deviceDetailStore.pipe(
      select(DeviceDetailSelector.getDetail),
      filter(data => data !== undefined),
      takeUntil(this.deviceDetailDestroy$)
    );

    this.deviceRealtimeData$ = this.deviceRealtimeStore.pipe(
      select(DeviceRealtimeSelector.getLatestData),
      filter(data => data !== undefined),
      takeUntil(this.deviceRealtimeDestroy$)
    );

    this.deviceStore.dispatch(new DeviceActions.Load());
  }

  public ngOnDestroy(): void {
    this.deviceDestroy$.next();
    this.deviceDestroy$.complete();

    this.deviceDetailDestroy$.next();
    this.deviceDetailDestroy$.complete();

    this.deviceRealtimeDestroy$.next();
    this.deviceRealtimeDestroy$.complete();

    this.intervalValueDestroy$.next();
    this.intervalValueDestroy$.complete();
  }

  public onDeviceSelected($event: DongleInterface): void {
    this.deviceStore.dispatch(new DeviceActions.SetSelectedDevice($event.dongleID));
  }
}
