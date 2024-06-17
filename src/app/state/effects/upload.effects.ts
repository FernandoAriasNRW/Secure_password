import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UploadService } from "../../services/upload.service";
import { uploadAvatar } from "../actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Image } from "../../shared/interfaces/upload";

@Injectable()
export class UploadEffects {

  uploadAvatar$ = createEffect(() => this._actions.pipe(
    ofType(uploadAvatar),
    exhaustMap((action) => this._uploadService.uploadAvatar(action.avatar).pipe(
      map((response: Image | null) => {
        if (response) {
          return ({ type: '[Upload Avatar] Upload Avatar Success', avatar: response.secureUrl, avatarId: response.publicId });
        }
        return ({ type: '[Upload Avatar] Upload Avatar Failed', error: true });
      }),
      catchError((error) => of({ type: '[Upload Avatar] Upload Avatar Failed', error }))
    ))
  ));

  constructor(
    private _actions: Actions,
    private _uploadService: UploadService,
  ) {}
}
