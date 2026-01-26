import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm : FormGroup;
  submitted = false;
  loginMessage = "";

  constructor(
    private readonly fb: FormBuilder, 
    private readonly router: Router,
    private readonly auth: AuthService
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.loginMessage = '';

    if(this.loginForm.invalid) {
      return;
    }

    const {email, password} = this.loginForm.value;

    const success = this.auth.login(email, password)

    if(success) {
      this.loginMessage = 'Login Successfully';
      this.router.navigate(['/feedback']);
    } else {
      this.loginMessage = 'Invalid Credentials/ Try admin@example.com / admin'
    }
  }

}
