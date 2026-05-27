import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'cadastro', loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.CadastroComponent) },
  { path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent) },
  { path: '**', redirectTo: '' }
];
