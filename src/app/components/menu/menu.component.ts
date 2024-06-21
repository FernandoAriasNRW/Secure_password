import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/state';
import { selectedRecord, showForm, user } from '../../state/actions';
import { ModalComponent } from '../modal/modal.component';
import { User } from '../../shared/interfaces/auth';
import { selectUser } from '../../state/selectors';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ModalComponent,
   ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  isExpanded: boolean = true;
  beforeElement: HTMLElement | null = null;
  user!: User;

  constructor(
    private _store: Store<AppState>,
  ){}

  ngOnInit(): void {

    this._store.select(selectUser).subscribe( result => {
      this.user = result.user;
    });
  }

  setDisplay(){
    this.isExpanded = !this.isExpanded;
  }

  showMenu(element: HTMLElement){

    if ( this.beforeElement && this.beforeElement !== element ) {
      this.beforeElement.id= '';
    }

    element.id = element.id === 'show-sidebar' ? '': 'show-sidebar';

    this.beforeElement = element;
  }



}
