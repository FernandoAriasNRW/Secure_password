import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
   ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  isExpanded: boolean = true;
  beforeElement: HTMLElement | null = null;

  setDisplay(){
    this.isExpanded = !this.isExpanded;
  }

  showMenu(element: HTMLElement){

    console.log('BeforeElemt: ', this.beforeElement);

    if ( this.beforeElement && this.beforeElement !== element ) {
      this.beforeElement.id= '';
    }

    element.id = element.id === 'show-sidebar' ? '': 'show-sidebar';

    this.beforeElement = element;
  }

}
