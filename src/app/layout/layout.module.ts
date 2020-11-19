import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import {RouterModule} from '@angular/router';
import { ErrorComponent } from './error/error.component';


@NgModule({
    declarations: [NavigationComponent, ErrorComponent],
    exports: [
        NavigationComponent
    ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
