import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { XssDemo } from './features/xss-demo/xss-demo';
import { Feedback } from './features/feedback/feedback';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'feedback', component: Feedback, canActivate: [authGuard] },
  { path: 'xss-demo', component: XssDemo },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default
  { path: '**', redirectTo: 'login' } // catch-all
];
