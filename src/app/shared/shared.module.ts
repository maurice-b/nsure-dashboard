import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxFormlyExtensionModule} from '@app-shared/ngx-formly-extention/ngx-formly-extension.module';
import {BaseGraphComponent} from '@app-shared/component/base-graph/base-graph.component';
import {ChartsModule} from 'ng2-charts';
import {DongleItemComponent} from '@app-shared/component/dongle-item/dongle-item.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    BaseGraphComponent,
    DongleItemComponent
  ],
  exports: [
    DongleItemComponent
  ],
  imports: [
    CommonModule,
    NgxFormlyExtensionModule,
    ChartsModule,
    FormsModule
  ]
})
export class SharedModule {
}
