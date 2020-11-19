import {Component} from '@angular/core';
import {FieldWrapper} from '@ngx-formly/core';

@Component({
  selector: 'app-formly-horizontal-wrapper',
  template: `
    <div class="form-group row align-items-center">
      <label [attr.for]="id" class="col-sm-4 col-form-label" *ngIf="to.label">
        {{ to.label }}
        <ng-container *ngIf="to.required && to.hideRequiredMarker !== true">*</ng-container>
      </label>
      <div class="col-sm-8">
        <ng-template #fieldComponent></ng-template>
      </div>

      <div *ngIf="showError" class="col-sm-12 invalid-feedback d-block">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
    </div>
  `
})
export class FormlyHorizontalWrapperComponent extends FieldWrapper {
}
