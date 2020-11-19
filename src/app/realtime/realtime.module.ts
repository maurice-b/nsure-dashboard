import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphComponent} from './graph/graph.component';
import {ChartsModule} from 'ng2-charts';
import { OverviewComponent } from './overview/overview.component';
import {ReportModule} from '@app-report/report.module';
import {RealtimeRoutingModule} from './realtime.routing';
import {SharedModule} from '@app-shared/shared.module';


@NgModule({
  declarations: [
    GraphComponent,
    OverviewComponent,
  ],
  imports: [
    RealtimeRoutingModule,
    CommonModule,
    ChartsModule,
    ReportModule,
    SharedModule
  ]
})
export class RealtimeModule { }
