import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: 'login', 
        loadComponent: ()=> import('./features/login/login.component').then(m => m.LoginComponent),
      },
      { 
        path: 'feedback',
        loadComponent: ()=> import('./features/feedback/feedback').then(m => m.Feedback),
        canActivate: [authGuard] 
      },
      { 
        path: 'xss-demo',
        loadComponent: ()=> import('./features/xss-demo/xss-demo').then(m => m.XssDemo),
      },
      { 
        path: 'employee-list',
        loadComponent: ()=> import('./features/employee-management/employee-management.component').then(m => m.EmployeeManagementComponent),
        canActivate: [authGuard],
      },
      {
        path: 'employee-list/add',
        loadComponent: () => import('./features/employee-management/employee-add-edit/employee-add-edit.component').then(m => m.EmployeeAddEditComponent),
        canActivate: [authGuard]
      },
      {
        path: 'employee-list/edit/:id',
        loadComponent: () => import('./features/employee-management/employee-add-edit/employee-add-edit.component').then(m => m.EmployeeAddEditComponent),
        canActivate: [authGuard]
      },
      { 
        path: 'logout',
        loadComponent: ()=> import('./features/logout/logout.component').then(m => m.LogoutComponent),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // default
      { path: '**', redirectTo: 'login' } // catch-all
    ]
  },
];
