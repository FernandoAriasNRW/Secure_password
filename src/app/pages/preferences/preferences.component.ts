import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MenuComponent,
    LoadingComponent
  ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {

  loading: boolean = false;

}
