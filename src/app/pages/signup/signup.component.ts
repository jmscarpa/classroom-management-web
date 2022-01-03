import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';
import { ModalAlertService } from '@services/modal-alert.service';

import { formHelper } from '@app/helpers/form.helper';
import { SessionModel } from '@app/models/SessionModel';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  public form: FormGroup;

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  public signup(): void {
    if (!formHelper.isValid(this.form)) {
      return;
    }

    this.apiService
      .post<SessionModel>('signup', this.form.value)
      .then((data) => {
        this.authService.token = data.token;
        this.router.navigateByUrl(this.authService.defaultPath);
      })
      .catch((errors) => {
        // tslint:disable-next-line: forin
        for (const error in errors) {
          this.form.controls[error].setErrors({
            customMessage: errors[error].join(),
          });
        }
      });
  }
}
