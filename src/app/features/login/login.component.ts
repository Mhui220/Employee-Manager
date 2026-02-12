import { Component } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  submitted = false;
  loginMessage = "";

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly toastr: ToastrService
    ) {
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit2(): void {
    this.submitted = true;
    this.loginMessage = '';

    if(this.loginForm.invalid) {
      return;
    }

    const success = this.auth.login(this.loginForm.controls.email.value!, this.loginForm.controls.password.value!)

    if(success) {
      this.loginMessage = 'Login Successfully';
      this.router.navigate(['/feedback']);
    } else {
      this.loginMessage = 'Invalid Credentials/ Try admin@example.com / admin'
    }
  }

  onSubmit() {
    this.auth.login(this.loginForm.controls.username.value!, this.loginForm.controls.password.value!).subscribe({
      next: (res) => {
        console.log('LOGIN OK', res);
        this.auth.setToken(res.token);
        this.router.navigate(['/employee-list']);
        this.toastr.success('Login Successfully');
      },
      error: (err) => {
        console.log('LOGIN ERROR', err);
        this.toastr.error('Login failed!');
      }

    });
  }

}
