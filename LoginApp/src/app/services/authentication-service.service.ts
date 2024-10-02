import { Injectable } from '@angular/core';
import { AuthenticationProxy } from '../proxies/authentication.proxy.service';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private authenticationProxy: AuthenticationProxy,
    private router: Router
  ) {}

  private readonly localStorageCSTokenKey = 'CSToken';

  login(email: string, password: string): Observable<boolean> {
    return this.authenticationProxy.login(email, password).pipe(
      map((response) => {
        if (this.checkJwtToken(response.token)) {
          // If the token is valid, return false (indicating the login is not successful)
          return false;
        }

        // Store the token in localStorage and navigate to the register page
        localStorage.setItem(this.localStorageCSTokenKey, response.token);
        this.router.navigateByUrl('register');
        return true; // Indicating the login was successful
      }),
      catchError((error) => {
        // Handle error and return false to indicate login failure
        console.error('Login error:', error);
        return of(false); // `of(false)` returns an Observable that emits `false`
      })
    );
  }

  logout() {
    localStorage.removeItem(this.localStorageCSTokenKey);
    this.router.navigateByUrl('login');
  }

  isUserLoggedIn() {
    const token = localStorage.getItem(this.localStorageCSTokenKey);
    if (!token) {
      this.logout();
      return false;
    }

    const tokenExpired = this.checkJwtToken(token);

    if (tokenExpired) {
      this.logout();
      return false;
    }
    return true;
  }

  private checkJwtToken(token: string) {
    //check if token is expired
    if (!token) {
      return true; // If no token is provided, consider it expired.
    }

    // Decode the payload of the JWT
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Compare the expiration time (`exp`) with the current time
    return payload.exp < currentTime;
  }
}
