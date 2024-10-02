import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthenticationProxy } from '../../proxies/authentication.proxy.service';

export const authGuard: CanMatchFn = (route, state) => {
  // const authService = inject(AuthService)
  // return authService.getAuthToken()

  const token = localStorage.getItem('currentUser');
  if (token) {
    return true;
  } else {
    return false;
  }
};
