import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/state';
import { selectedRecord, showForm } from '../../state/actions';
import { ModalComponent } from '../modal/modal.component';

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
export class MenuComponent {

  isExpanded: boolean = true;
  beforeElement: HTMLElement | null = null;

  constructor(
    private _store: Store<AppState>,
  ){}

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
