import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview/overview.component';
import {ChartsModule} from 'ng2-charts';
import {StatsModule} from '@app-stats/stats.module';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {GraphComponent} from './graph/graph.component';
import {ReportRoutingModule} from './report.routing';
import {SharedModule} from '@app-shared/shared.module';


@NgModule({
  declarations: [OverviewComponent, GraphComponent],
  exports: [],
  imports: [
    ReportRoutingModule,
    CommonModule,
    ChartsModule,
    StatsModule,
    FormlyModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ReportModule {
}
