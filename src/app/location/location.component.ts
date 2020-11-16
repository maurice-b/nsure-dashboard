import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {state as LocationState, selector as LocationSelector, actions as LocationActions} from '@app-shared/state/location';
import {state as LocationDetailState, selector as LocationDetailSelector, actions as LocationDetailActions} from '@app-shared/state/location-detail';
import {filter, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {LocationInterface} from '@app-shared/services/location/location.interface';
import {LocationDetailInterface} from '@app-shared/services/location/location-detail.interface';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {

  private locationDestroy$ = new Subject();
  private locationDetailDestroy$ = new Subject();
  public locations$: Observable<LocationInterface[]> | undefined;
  public locationsDetails$: Observable<LocationDetailInterface | undefined> | undefined = undefined;


  public constructor(
    private locationStore: Store<LocationState.LocationStateInterface>,
    private locationDetailStore: Store<LocationDetailState.LocationDetailStateInterface>
  ) {
  }

  public ngOnInit(): void {
    this.locations$ = this.locationStore.pipe(
      select(LocationSelector.getData),
      filter(data => data !== undefined),
      takeUntil(this.locationDestroy$)
    );

    this.locationsDetails$ = this.locationDetailStore.pipe(
      select(LocationDetailSelector.getLocationDetail),
      filter(data => data !== undefined ),
      takeUntil(this.locationDetailDestroy$)
    );

    this.locationStore.dispatch(new LocationActions.Load());
  }

  public ngOnDestroy(): void {
    this.locationDestroy$.next();
    this.locationDestroy$.complete();

    this.locationDetailDestroy$.next();
    this.locationDetailDestroy$.complete();
  }

  public locationIndex(index: number, location: LocationInterface): string | undefined {
    return location ? location.locationId : undefined;
  }

  public loadLocationDetails(locationId: string): void {
    this.locationDetailStore.dispatch(new LocationDetailActions.Load(locationId));
  }
}
