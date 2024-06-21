import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'myvault', component: HomeComponent },
      { path: 'account', component: AccountComponent },
      { path: 'preferences', component: PreferencesComponent },
      { path: '', redirectTo: '/myvault', pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
