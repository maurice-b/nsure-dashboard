import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-formly-field-timepicker',
  template: `
      <timepicker
              [hourStep]="1"
              [minuteStep]="1"
              [showMeridian]="false"
              [mousewheel]="true"
              [arrowkeys]="true"
              [showMinutes]="true"
              [showSeconds]="false"
              [showSpinners]="true"
              [readonlyInput]="false"
              [formControl]="formControl"
              [formlyAttributes]="field"
      ></timepicker>
  `
})
export class TimePickerTypeComponent extends FieldType {
  public formControl!: FormControl;
}

