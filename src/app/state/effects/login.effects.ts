import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { Login, LoginResponse } from "../../shared/interfaces/auth";
import { catchError, exhaustMap, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { login } from "../actions";

@Injectable()
export class LoginEffects {


  login$ = createEffect(() => this._actions.pipe(
    ofType(login),
    exhaustMap(action => this._loginService.login(action).pipe(
      map( (result: LoginResponse) => {
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('user_id', result.userId);
        localStorage.setItem('user_role', result.role);
        localStorage.setItem('expires_in', result.expiresIn);

        if (result.token) {
          return { type: '[Login Page] Login Success',  login: true};
        }
        return { type: '[Login Page] Login Error', error: { message: 'Wrong Email or Password', statusCode: 400 } };
      }
      ),
      catchError((error: Error) => of({ type: '[Login Page] Login Error', error: { message: error.message, statusCode: 400 } }))
    ))))

  constructor(
    private _actions: Actions,
    private _loginService: AuthService,
  ) { }
}

