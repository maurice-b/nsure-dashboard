import {Component, OnInit} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {DateTime} from 'luxon';
import {FormControl} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-formly-field-daterangepicker',
  template: `
    <input
      type="text"
      class="form-control"
      placement="bottom"
      bsDaterangepicker
      [formControl]="formControl"
      [formlyAttributes]="field"
      [minDate]="to.minDate"
      [maxDate]="to.maxDate"
      #dobDate="bsDaterangepicker"
      [bsConfig]="bsConfig"
      [placeholder]="to.placeholder"
      [class.is-invalid]="showError">`
})
export class DateRangePickerTypeComponent extends FieldType implements OnInit {
  public formControl!: FormControl;

  private readonly placeholderDateFormat = 'DD-MM-YYYY - DD-MM-YYYY';
  private readonly defaultDateFormat = 'DD-MM-YYYY';

  public bsConfig: Partial<BsDatepickerConfig> = {};

  public defaultOptions = {
    templateOptions: {
      minDate: null,
      maxDate: null,
      placeholder: this.placeholderDateFormat,
      rangeInputFormat: this.defaultDateFormat,
    },
  };

  public ngOnInit(): void {
    if (this.to) {
      this.bsConfig = {
        rangeInputFormat: this.to?.rangeInputFormat,
        containerClass: 'theme-default'
      };

      this.to.minDate = (DateTime.isDateTime(this.to.minDate)) ? this.to.minDate.toJSDate() : this.to.minDate;
      this.to.maxDate = (DateTime.isDateTime(this.to.maxDate)) ? this.to.maxDate.toJSDate() : this.to.maxDate;
    }
  }
}
