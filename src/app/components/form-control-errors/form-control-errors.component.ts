import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-errors',
  templateUrl: './form-control-errors.component.html',
})
export class FormControlErrorsComponent {
  @Input() public control: AbstractControl;
}
