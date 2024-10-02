import { Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/data-access/base-http.service';
import { Observable, of } from 'rxjs';
import { CsLoginResponse } from '../model/response-bodies/cs-login-response';

@Injectable()
export class AuthenticationProxy extends BaseHttpService {
  login(email: string, password: string): Observable<CsLoginResponse> {
    return this.http.post<CsLoginResponse>(
      `${this.apiUrl}AuthenticationController/login`,
      {
        email,
        password,
      }
    );
  }
}
