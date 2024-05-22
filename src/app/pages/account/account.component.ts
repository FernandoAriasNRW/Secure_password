import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  loading: boolean = false;

}
