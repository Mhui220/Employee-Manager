import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const toastr = inject(ToastrService);

  // Add token to header if exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    tap({
      error: (err: any) => {
        if (err.status === 401) {
          // Token invalid/expired → auto logout
          localStorage.removeItem('token');  // remove token
          toastr.error('Session expired. Please login again.');
          router.navigate(['/login']);       // redirect to login
        }
      }
    })
  );
};