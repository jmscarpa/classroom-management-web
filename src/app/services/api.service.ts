import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  public async get<T>(url: string, params: object = {}): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.get<T>(
        `${environment.apiUrl}/${url}`,
        this.getOptions(params)
      )
    );
  }

  public async post<T>(url: string, params: object = {}): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.post<T>(
        `${environment.apiUrl}/${url}`,
        params,
        this.getOptions()
      )
    );
  }

  public async put<T>(url: string, params: object = {}): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.put<T>(
        `${environment.apiUrl}/${url}`,
        params,
        this.getOptions()
      )
    );
  }

  public async patch<T>(url: string, params: object = {}): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.patch<T>(
        `${environment.apiUrl}/${url}`,
        params,
        this.getOptions()
      )
    );
  }

  public async delete<T>(url: string, params: object = {}): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.delete<T>(
        `${environment.apiUrl}/${url}`,
        this.getOptions({}, params)
      )
    );
  }

  private async parseRequest<T>(request: Observable<T>): Promise<T> {
    return request
      .toPromise()
      .then((success: T) => success)
      .catch((error: HttpErrorResponse) => this.errorResponse(error));
  }

  private getOptions(params: object = {}, body: object = {}): object {
    const headers = { 'Content-Type': 'application/json' };

    if (this.authService.token) {
      headers['Authorization'] = `Bearer ${this.authService.token}`;
    }

    return {
      headers,
      params,
      body,
    };
  }

  private errorResponse(response: HttpErrorResponse): null {
    // switch (response.status) {
    //   case 401: {
    //     this.authService.clear();
    //     this.safeNavigateTo('/login');
    //     break;
    //   }
    //   case 403: {
    //     this.safeNavigateTo('/login');
    //     break;
    //   }
    //   case 404: {
    //     this.safeNavigateTo('/login');
    //     break;
    //   }
    //   case 422: {
    //     console.log('response');
    //     throw response.error;
    //   }
    //   default: {
    //     this.safeNavigateTo('/login');
    //     break;
    //   }
    // }
    throw response.error;
  }

  private safeNavigateTo(route: string): void {
    const currentPath = this.router.url.split('/')[1];
    if (currentPath !== route) {
      this.router.navigateByUrl(route);
    }
  }
}
