import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { MenuComponent } from "../components/menu/menu.component";
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from "../components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/interfaces/state';
import { selectLoading } from '../state/selectors';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-pages',
    standalone: true,
    templateUrl: './pages.component.html',
    imports: [
        HeaderComponent,
        MenuComponent,
        HomeComponent,
        LoadingComponent,
        CommonModule,
        RouterOutlet,
    ]
})
export class PagesComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.select(selectLoading).subscribe( result => {
      this.loading = result;
    });
  }

}
