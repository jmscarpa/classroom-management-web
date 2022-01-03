import { AuthGuard } from '@guards/auth.guard';
import { LayoutComponent } from '@pages/layout/layout.component';
import { LoginComponent } from '@pages/login/login.component';
import { SignupComponent } from '@pages/signup/signup.component';
import { StudentDetailsComponent } from '@pages/student-details/student-details.component';
import { StudentLessonsComponent } from '@pages/student-lessons/student-lessons.component';
import { StudentNewComponent } from '@pages/student-new/student-new.component';
import { StudentPaymentsComponent } from '@pages/student-payments/student-payments.component';
import { StudentsListComponent } from '@pages/students-list/students-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StudentsListComponent },
      { path: 'students/new', component: StudentNewComponent },
      {
        path: 'students/:id',
        component: StudentDetailsComponent,
        children: [
          { path: 'lessons', component: StudentLessonsComponent },
          { path: 'payments', component: StudentPaymentsComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
