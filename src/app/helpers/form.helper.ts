import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

const markAllAsTouched = (controls) => {
  return Object.keys(controls).forEach((controlName) => {
    const control = controls[controlName];
    if (control instanceof FormArray) {
      control.controls.forEach((item: FormGroup) =>
        markAllAsTouched(item.controls)
      );
    } else {
      control.markAsTouched();
    }
  });
};

const scrollToFirstInvalid = () => {
  const firstInvalidControl = document.querySelector('.ng-invalid:not(form)');
  if (firstInvalidControl) {
    firstInvalidControl.parentElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const isValid = (form: FormGroup) => {
  if (form.valid) {
    return true;
  } else {
    markAllAsTouched(form.controls);
    scrollToFirstInvalid();
    return false;
  }
};

const updateEnabled = (control: AbstractControl, isEnabled: boolean) => {
  if (isEnabled) {
    control.enable({ emitEvent: false });
  } else {
    control.disable({ emitEvent: false });
  }
};

export const formHelper = {
  isValid,
  updateEnabled,
};
