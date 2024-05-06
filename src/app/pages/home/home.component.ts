import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading.component';
import { AppState } from '../../shared/interfaces/state';
import { Store } from '@ngrx/store';
import { selectLoading, selectLogin } from '../../state/selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { MenuComponent } from "../../components/menu/menu.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        LoadingComponent,
        CommonModule,
        HeaderComponent,
        MenuComponent
    ]
})
export class HomeComponent implements OnInit {

  private _loading: Observable<Boolean> = new Observable();

  constructor(
    private readonly store: Store<AppState>
  ) { }
  ngOnInit(): void {
   this._loading = this.store.select(selectLoading);
  }

  get loading(): Observable<Boolean> {
    return this._loading;
  }

}
