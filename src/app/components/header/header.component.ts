import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/state';
import { getUser } from '../../state/actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ SearchComponent ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly store: Store<AppState>,
  ){}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.store.dispatch(getUser({ user: userId }));
    }
  }

}
