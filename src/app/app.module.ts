import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormControlErrorsComponent } from './components/form-control-errors/form-control-errors.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentNewComponent } from './pages/student-new/student-new.component';
import { StudentsListComponent } from './pages/students-list/students-list.component';
import { NullPipe } from './pipes/null.pipe';

import { JwtModule } from '@auth0/angular-jwt';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StudentLessonsComponent } from './pages/student-lessons/student-lessons.component';
import { StudentPaymentsComponent } from './pages/student-payments/student-payments.component';

export const tokenGetter = (): string => {
  return localStorage.token;
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    StudentsListComponent,
    FormControlErrorsComponent,
    NullPipe,
    ModalAlertComponent,
    LayoutComponent,
    StudentDetailsComponent,
    StudentNewComponent,
    StudentLessonsComponent,
    StudentPaymentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbNavModule,
    JwtModule.forRoot({ config: { tokenGetter } }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
