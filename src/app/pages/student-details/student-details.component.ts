import { ApiService } from '@services/api.service';

import { StudentModel } from '@app/models/student-model';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  public id: number = this.route.snapshot.params.id;
  public student: StudentModel;

  public ngOnInit(): void {
    this.apiService.get<StudentModel>(`students/${this.id}`).then((data) => {
      this.student = data;
    });
  }
}
