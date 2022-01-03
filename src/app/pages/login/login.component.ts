import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';

import { formHelper } from '@app/helpers/form.helper';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionModel } from '@app/models/SessionModel';
import { ModalAlertService } from '@services/modal-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private modalAlertService: ModalAlertService,
    private router: Router
  ) {}

  public form: FormGroup;

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login(): void {
    if (!formHelper.isValid(this.form)) {
      return;
    }

    this.form.markAsUntouched();
    this.apiService
      .post<SessionModel>('sessions', this.form.value)
      .then((data) => {
        this.authService.token = data.token;
        this.router.navigateByUrl(this.authService.defaultPath);
      })
      .catch((data) => {
        this.modalAlertService.show({
          title: 'Heads Up',
          description: data.error,
        });
      });
  }
}
