import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'operations/compare', loadComponent: () => import('./features/quantity/operations/compare/compare.component').then(m => m.CompareComponent) },
  { path: 'operations/convert', loadComponent: () => import('./features/quantity/operations/convert/convert.component').then(m => m.ConvertComponent) },
  { path: 'operations/add', loadComponent: () => import('./features/quantity/operations/add/add.component').then(m => m.AddComponent) },
  { path: 'operations/subtract', loadComponent: () => import('./features/quantity/operations/subtract/subtract.component').then(m => m.SubtractComponent) },
  { path: 'operations/divide', loadComponent: () => import('./features/quantity/operations/divide/divide.component').then(m => m.DivideComponent) },
  { path: 'history/operation', loadComponent: () => import('./features/history/operation/operation.component').then(m => m.OperationComponent), canActivate: [AuthGuard] },
  { path: 'history/type', loadComponent: () => import('./features/history/type/type.component').then(m => m.TypeComponent), canActivate: [AuthGuard] },
  { path: 'history/errors', loadComponent: () => import('./features/history/errors/errors.component').then(m => m.ErrorsComponent), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard' }
];
