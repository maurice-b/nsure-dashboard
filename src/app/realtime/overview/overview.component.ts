import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {actions as DeviceActions, selector as DeviceSelector, state as DeviceState} from '@app-shared/state/device';
import {interval, Observable, Subject} from 'rxjs';
import {DongleInterface} from '@app-shared/services/device/dongle.interface';
import {filter, takeUntil, tap} from 'rxjs/operators';
import {RealtimeDataInterface} from '@app-shared/services/realtime-data/realtime-data.interface';
import {
  actions as DeviceRealtimeActions,
  selector as DeviceRealtimeSelector,
  state as DeviceRealtimeState
} from '@app-shared/state/device-realtime';
import {DeviceTypeEnum} from '@app-shared/services/device/device-type.enum';
import {GraphItemInterface} from '@app-shared/interfaces/graph-item.interface';

@Component({
  selector: 'app-realtime-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  public isLoadingData = false;

  public devices$: Observable<DongleInterface[]> | undefined;
  private deviceDestroy$ = new Subject();

  private deviceRealtimeDestroy$ = new Subject();
  public deviceRealtimeData$: Observable<RealtimeDataInterface[] | undefined> | undefined;

  private intervalValueDestroy$ = new Subject();

  public constructor(
    private deviceStore: Store<DeviceState.DeviceStateInterface>,
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

      this.isLoadingData = true;
      this.deviceRealtimeStore.dispatch(new DeviceRealtimeActions.Load(DeviceTypeEnum.dongle, data?.dongleID));

      // Set interval
      const intervalValue = 10; // 10 seconds
      interval(intervalValue * 1000)
        .pipe(takeUntil(this.intervalValueDestroy$))
        .subscribe(() => {
          this.isLoadingData = true;
          this.deviceRealtimeStore.dispatch(new DeviceRealtimeActions.Load(DeviceTypeEnum.dongle, data?.dongleID));
        });
    });

    this.deviceRealtimeData$ = this.deviceRealtimeStore.pipe(
      select(DeviceRealtimeSelector.getData),
      filter(data => data !== undefined),
      tap( () => {
        this.isLoadingData = false;
      }),
      takeUntil(this.deviceRealtimeDestroy$)
    );

    this.deviceStore.dispatch(new DeviceActions.Load());
  }


  public ngOnDestroy(): void {
    this.deviceDestroy$.next();
    this.deviceDestroy$.complete();

    this.deviceRealtimeDestroy$.next();
    this.deviceRealtimeDestroy$.complete();

    this.intervalValueDestroy$.next();
    this.intervalValueDestroy$.complete();
  }

  public onDeviceSelected($event: DongleInterface): void {
    this.deviceStore.dispatch(new DeviceActions.SetSelectedDevice($event.dongleID));
  }

}
