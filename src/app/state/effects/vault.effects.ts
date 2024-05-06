import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VaultService } from "../../services/vault.service";

@Injectable()
export class VaultEffects {

  constructor(
    private _actions: Actions,
    private _vaultService: VaultService,
  ) { }
}
