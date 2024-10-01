import { Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/data-access/base-http.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService extends BaseHttpService {

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}AuthenticationController/login`, {
      email,
      password,
    });
  }
}
