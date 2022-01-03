import { LevelModel } from '@app/models/level-model';

export interface StudentsListModel {
  current_page: number;
  total_pages: number;
  students: StudentModel[];
}

export interface StudentModel {
  id: number;
  name: string;
  current_level: LevelModel;
  phone: string;
  email: string;
}
