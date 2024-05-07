import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { getUser } from "../actions";
import { User } from "../../shared/interfaces/auth";

@Injectable()
export class UserEffects {

  user$ = createEffect(() => this._actions.pipe(
    ofType(getUser),
    exhaustMap(action => this._userService.getUser(action.user).pipe(
      map( (result: User | null) => {
        if (result){
          return { type: '[Home Page] User',  user: result}
        }
        return { type: '[Home Page] Get User failed',  error: true}
      }
      ),
      catchError(error => of({ type: '[Login Page] Login Success', error }))
    ))))

  constructor(
    private _actions: Actions,
    private _userService: UserService,
  ) { }
}
