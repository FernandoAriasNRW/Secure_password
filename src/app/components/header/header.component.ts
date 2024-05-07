import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/state';
import { getUser } from '../../state/actions';
import { User } from '../../shared/interfaces/auth';
import { selectUser } from '../../state/selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SearchComponent,
    CommonModule,
   ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  user!: User;

  constructor(
    private readonly store: Store<AppState>,
  ){}

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      this.store.dispatch(getUser({ user: userId }));
    }

    this.store.select(selectUser).subscribe( result => {
      this.user = result.user;
    })

  }

}
