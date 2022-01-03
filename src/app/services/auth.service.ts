import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserModel } from '@app/models/user-model';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  public get isLoggedIn(): boolean {
    return !!this.tokenPayload;
  }

  public get currentUserAsObservable(): Observable<UserModel> {
    return this._currentUser.asObservable();
  }

  public get currentUserAsPromise(): Promise<UserModel> {
    return this.currentUserAsObservable.pipe(take(1)).toPromise();
  }

  public get token(): string {
    return localStorage.token;
  }

  public set token(value: string) {
    if (localStorage.token !== value) {
      localStorage.token = value;
      this._currentUser.next(this.tokenPayload);
    }
  }

  public get defaultPath(): string {
    if (!this.isLoggedIn) {
      return '/login';
    } else {
      return '/';
    }
  }

  private get tokenPayload(): UserModel {
    try {
      return this.jwtHelper.decodeToken<UserModel>(this.token);
    } catch (error) {
      return null;
    }
  }

  public _currentUser = new BehaviorSubject<UserModel>(this.tokenPayload);

  public clear(): void {
    localStorage.clear();
  }
}
