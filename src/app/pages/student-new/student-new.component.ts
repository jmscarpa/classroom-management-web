import { ApiService } from '@services/api.service';
import { ModalAlertService } from '@services/modal-alert.service';

import { formHelper } from '@app/helpers/form.helper';
import { LevelModel } from '@app/models/level-model';
import { SessionModel } from '@app/models/SessionModel';
import { SuccessModel } from '@app/models/success-model';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.scss'],
})
export class StudentNewComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private modalAlertService: ModalAlertService,
    private router: Router
  ) {}

  public form: FormGroup;
  public levels: LevelModel[];

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      current_level_id: ['', [Validators.required]],
    });
    this.fetchLevels();
  }

  public save(): void {
    if (!formHelper.isValid(this.form)) {
      return;
    }

    this.form.markAsUntouched();
    this.apiService
      .post<SuccessModel>('students', this.form.value)
      .then((data) => {
        this.router.navigateByUrl(`/students/${data.id}/lessons`);
      })
      .catch((data) => {
        this.modalAlertService.show({
          title: 'Heads Up',
          description: data.error,
        });
      });
  }

  private fetchLevels(): void {
    this.apiService.get<LevelModel[]>('levels').then((data) => {
      this.levels = data;
      this.form.controls.current_level_id.setValue(this.levels[0].id);
    });
  }
}
