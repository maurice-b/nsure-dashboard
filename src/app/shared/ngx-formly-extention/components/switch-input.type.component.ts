import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-formly-field-switch-input',
  template: `
    <label class="col-form-label switch switch-label switch-pill switch-success switch-slider-default-danger ml-2 mr-2">
      <input
        class="switch-input"
        type="checkbox"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [id]="id"
        [checked]="formControl.value"
        [value]="formControl.value"
      >
      <span class="switch-slider" data-checked="✓" data-unchecked="✕"></span>
    </label>`
})
export class SwitchInputTypeComponent extends FieldType {
  public formControl!: FormControl;
}
