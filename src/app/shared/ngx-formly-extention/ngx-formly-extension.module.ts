import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerTypeComponent } from './components/date-picker.type.component';
import { DateRangePickerTypeComponent } from './components/date-range-picker.type.component';
import { SwitchInputTypeComponent } from './components/switch-input.type.component';
import { TimePickerTypeComponent } from './components/time-picker.type.component';
import { FormlyHorizontalWrapperComponent } from './wrappers/formly-horizontal-wrapper.component';

// tslint:disable-next-line:no-any
export function minlengthValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `Should have atleast ${field.templateOptions?.minLength} characters`;
}

// tslint:disable-next-line:no-any
export function maxlengthValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `This value should be less than ${field.templateOptions?.maxLength} characters`;
}

// tslint:disable-next-line:no-any
export function minValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `This value should be more than ${field.templateOptions?.min}`;
}

// tslint:disable-next-line:no-any
export function maxValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `This value should be less than ${field.templateOptions?.max}`;
}

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,

        FormlyModule.forRoot({
            types: [
                {
                    name: 'timepicker',
                    component: TimePickerTypeComponent,
                    wrappers: ['form-field']
                },
                {
                    name: 'datepicker',
                    component: DatePickerTypeComponent,
                    wrappers: ['form-field']
                },
                {
                    name: 'daterangepicker',
                    component: DateRangePickerTypeComponent,
                    wrappers: ['form-field']
                },
                {
                    name: 'switch-input',
                    component: SwitchInputTypeComponent,
                    wrappers: ['form-field']
                }
            ],
            validationMessages: [
                {name: 'required', message: 'This field is required'},
                {name: 'minlength', message: minlengthValidationMessage},
                {name: 'maxlength', message: maxlengthValidationMessage},
                {name: 'min', message: minValidationMessage},
                {name: 'max', message: maxValidationMessage}
            ],
            wrappers: [
                {
                    name: 'form-field-horizontal',
                    component: FormlyHorizontalWrapperComponent
                }
            ],
        }),
        FormlyBootstrapModule,

        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
    ],
  declarations: [
    TimePickerTypeComponent,
    DatePickerTypeComponent,
    DateRangePickerTypeComponent,
    SwitchInputTypeComponent,
    FormlyHorizontalWrapperComponent
  ],
  providers: [],
  exports: [
    TimePickerTypeComponent,
    DatePickerTypeComponent,
    DateRangePickerTypeComponent,
    SwitchInputTypeComponent,
    FormlyHorizontalWrapperComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class NgxFormlyExtensionModule {
  static forRoot(): ModuleWithProviders<NgxFormlyExtensionModule> {
    return {
      ngModule: NgxFormlyExtensionModule,
      providers: []
    };
  }
}
