import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from '../../shared/interfaces/state';
import { HeaderComponent } from "../../components/header/header.component";
import { login, loginAction } from '../../state/actions';
import { selectLoading, selectLogin } from '../../state/selectors';
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
        LoadingComponent,
        RouterModule,
    ]
})
export class LoginComponent implements OnInit, OnChanges {

  form!: FormGroup;
  private _loading: boolean = false;
  private _isLoggedIn: boolean = false;

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
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {

    const token = localStorage.getItem('auth_token')

    if (token){
      this.store.dispatch(loginAction({login: true}));
    }

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {

    if (this.form.valid) {

      this.store.dispatch(login({email: this.form.controls['email'].value, password: this.form.controls['password'].value }));

      this.store.select(selectLogin).subscribe(login => {

        if (this._isLoggedIn !== login.isLoggedIn) {
          this._isLoggedIn = login.isLoggedIn;
        if(this._isLoggedIn){

          this.router.navigate(['/']);
          return;
        } else {
          this._loading = false;

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });

          Toast.fire({
            icon: "error",
            title: "Wrong email or password",
          });
        }}
      });
    }
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      if (!(this.form.controls['email'].valid)) {

        Toast.fire({
          icon: "error",
          title: "Please enter a valid email address",
        });
      } else if (!(this.form.controls['password'].valid)) {

        Toast.fire({
          icon: "error",
          title: "Please enter a password",
        });
      }

  }

  get loading(): boolean {
    return this._loading;
  }

}
