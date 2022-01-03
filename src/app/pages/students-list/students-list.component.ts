import { ApiService } from '@services/api.service';

import { LevelModel } from '@app/models/level-model';
import { StudentModel, StudentsListModel } from '@app/models/student-model';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  public students: StudentModel[];
  public currentPage: number = 0;
  public totalPages: number = 0;
  public levels: LevelModel[];
  public currentLevelId: number | null = null;

  public ngOnInit(): void {
    this.loadStudents();
    this.fetchLevels();
  }

  public movePage(page: number): void {
    this.loadStudents(page);
  }

  public filterLevel(levelId: number | null = null): void {
    this.currentLevelId = levelId;
    this.loadStudents(this.currentPage, levelId);
  }

  private loadStudents(page: number = 1, level: number | null = null): void {
    const payload = { page };
    if (level) {
      payload['level'] = level;
    }
    this.apiService
      .get<StudentsListModel>('/students', payload)
      .then((data) => {
        this.currentPage = data.current_page;
        this.totalPages = data.total_pages;
        this.students = data.students;
      });
  }

  private fetchLevels(): void {
    this.apiService.get<LevelModel[]>('levels').then((data) => {
      this.levels = data;
    });
  }
}
