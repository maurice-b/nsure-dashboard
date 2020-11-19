import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview/overview.component';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {RealtimeDataService} from '@app-shared/services/realtime-data/realtime-data.service';
import {DongleItemDetailComponent} from '@app-stats/dongle-item-detail/dongle-item-detail.component';
import {LocationComponent} from '@app-stats/location/location.component';
import {SharedModule} from '@app-shared/shared.module';
import {StatsRoutingModule} from '@app-stats/stats.routing';


@NgModule({
  declarations: [
    OverviewComponent,
    DongleItemDetailComponent,
    LocationComponent
  ],
  imports: [
    StatsRoutingModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    SharedModule
  ],
  exports: [],
  providers: [
    RealtimeDataService
  ]
})
export class StatsModule {
}
