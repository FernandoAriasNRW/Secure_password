import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/state';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { login } from '../../state/actions';
import { Router } from '@angular/router';
import { selectLogin } from '../../state/selectors';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [
      HeaderComponent,
      ReactiveFormsModule
    ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
  ) {

    const isLoggedIn = this.store.select(selectLogin).subscribe(login => login.isLoggedIn);
    if (isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {
    this.store.dispatch(login({email: this.form.controls['email'].value, password: this.form.controls['password'].value }));
    this.router.navigate(['/']);
  }

}
