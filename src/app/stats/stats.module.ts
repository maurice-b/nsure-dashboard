import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatsRealtimeComponent} from './stats-realtime/stats-realtime.component';
import {StatsContainerComponent} from './stats-container/stats-container.component';
import {DongleItemComponent} from './dongle-item/dongle-item.component';
import {FormsModule} from '@angular/forms';
import { DongleItemDetailComponent } from './dongle-item-detail/dongle-item-detail.component';
import {ChartsModule} from 'ng2-charts';
import { StatsHistoryComponent } from './stats-history/stats-history.component';


@NgModule({
  declarations: [
    StatsRealtimeComponent,
    StatsContainerComponent,
    DongleItemComponent,
    DongleItemDetailComponent,
    StatsHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class StatsModule {
}
