import { Component, HostListener } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../../services/auth.proxy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  //#region Getters
  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
  //#endregion

  //#region clear local storage on refresh

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    window.onbeforeunload = function () {
      localStorage.clear();
      return '';
    };
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          localStorage.setItem('currentUser', JSON.stringify(response.token));
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
