import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { UserService } from "../../services/user.service";

@Injectable()
export class UserEffects {

  constructor(
    private _action: Actions,
    private _userService: UserService,
  ) { }
}
