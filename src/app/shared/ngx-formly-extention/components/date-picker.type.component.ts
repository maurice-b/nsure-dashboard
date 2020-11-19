import {Component, OnInit} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {DateTime} from 'luxon';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-formly-field-datepicker',
  template: `
    <input
      class="form-control calendar"
      bsDatepicker
      placement="bottom"
      type="text"
      [bsConfig]="bsConfig"
      [formControl]="formControl"
      [formlyAttributes]="field"
      placeholder="DD-MM-YYYY"
      [class.is-invalid]="showError">`

})
export class DatePickerTypeComponent extends FieldType implements OnInit {
  public formControl!: FormControl;

  // Optional: only if you want to rely on `MatInput` implementation
  public bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD-MM-YYYY',
    showWeekNumbers: false
  };

  public ngOnInit(): void {
    if (this.to) {
      if (this.to.minDate) {
        this.bsConfig.minDate = (DateTime.isDateTime(this.to.minDate)) ? this.to.minDate.toJSDate() : this.to.minDate;
      }
      if (this.to.maxDate) {
        this.bsConfig.maxDate = (DateTime.isDateTime(this.to.maxDate)) ? this.to.maxDate.toJSDate() : this.to.maxDate;
      }

      if (this.to.dateFormat) {
        this.bsConfig.dateInputFormat = this.to.dateFormate;
      }
    }
  }
}
