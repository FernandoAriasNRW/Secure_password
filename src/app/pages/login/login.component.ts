import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/state';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { login, loginAction } from '../../state/actions';
import { Router } from '@angular/router';
import { selectLoading, selectLogin } from '../../state/selectors';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [
        HeaderComponent,
        ReactiveFormsModule,
        CommonModule,
        LoadingComponent
    ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  private _loading: boolean = false;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
  ) {

    this.store.select(selectLoading).subscribe( loading => {
      this._loading = loading;
    })


    this.store.select(selectLogin).subscribe(login => {
      const isLoggedIn = login.isLoggedIn;

      if (isLoggedIn) {
       this.router.navigate(['/']);
     }

    });
  }

  ngOnInit() {

    const token = localStorage.getItem('auth_token')

    if (token){
      this.store.dispatch(loginAction({login: true}));
    }

    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {

    this.store.dispatch(login({email: this.form.controls['email'].value, password: this.form.controls['password'].value }));

    this.store.select(selectLogin).subscribe(login => {
      const isLoggedIn = login.isLoggedIn

      if (isLoggedIn) {
        this.router.navigate(['/']);
      }

    });
  }

  get loading(): boolean {
    return this._loading;
  }

}
