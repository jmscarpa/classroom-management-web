import { Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

export interface ModalAlertServiceOptions {
  title?: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModalAlertService {
  private _options = new Subject<ModalAlertServiceOptions>();

  public get options(): Observable<ModalAlertServiceOptions> {
    return this._options.asObservable();
  }

  public show(options: ModalAlertServiceOptions): void {
    if (options && options.description) {
      this._options.next(options);
    }
  }
}
