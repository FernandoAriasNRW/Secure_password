import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading.component';
import { AppState } from '../../shared/interfaces/state';
import { Store } from '@ngrx/store';
import { selectLoading, selectLogin } from '../../state/selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { MenuComponent } from "../../components/menu/menu.component";
import { Router } from '@angular/router';
import { getRecords, getUser, loginAction } from '../../state/actions';
import { SearchComponent } from '../../components/search/search.component';
import { ListsComponent } from '../lists/lists.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        LoadingComponent,
        CommonModule,
        HeaderComponent,
        MenuComponent,
        SearchComponent,
        ListsComponent,
    ]
})
export class HomeComponent implements OnInit {

  private _loading: Observable<Boolean> = new Observable();

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
  ) { }
  ngOnInit(): void {

    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('user_id');
    const expiresIn = localStorage.getItem('expires_in');

    if (token && userId && expiresIn) {

      const now = Date.now();
      const expires = Date.parse(expiresIn);


      if ( expires >= now ) {
        this.store.dispatch(loginAction({login: true}));
        this.store.dispatch(getUser({user: userId}));
        this.store.dispatch(getRecords());
      } else {
        this.store.dispatch(loginAction({login: false}));
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('user_role');
      }
    }

    this.store.select(selectLogin).subscribe(login => {

      const isLoggedIn = login.isLoggedIn;

          if (!isLoggedIn) {
            this.router.navigate(['/login']);
          }
    });

   this._loading = this.store.select(selectLoading);
  }

  get loading(): Observable<Boolean> {
    return this._loading;
  }

}
