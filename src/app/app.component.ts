import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppState } from './shared/interfaces/state';
import { Store } from '@ngrx/store';
import { selectLogin } from './state/selectors';
import { PagesComponent } from './pages/pages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MenuComponent,
    PagesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'securePassword';
  isLoggedIn = false;

  constructor(
    private readonly store: Store<AppState>,
  ){

  }
  ngOnInit(): void {
    // this.store.select(selectLogin).subscribe( data => {
    //   console.log(this.isLoggedIn);
    //   this.isLoggedIn = data.isLoggedIn;
    // });
  }

}
