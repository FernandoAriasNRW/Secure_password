import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { RecordService } from "../../services/record.service";
import { Record } from "../../shared/interfaces/records";
import { getRecords, updateRecord } from "../actions";

@Injectable()
export class RecordEffects {

  record$ = createEffect(() => this._actions.pipe(
    ofType(getRecords),
    exhaustMap(() => this._recordService.getRecords().pipe(
      map( (result: Record[]) => {
        if (result){
          return { type: '[Home Page] Records',  records: result.filter(r => r.vaultId === null) };
        }
        return { type: '[Home Page] Get Records failed',  error: true}
      }
      ),
      catchError(error => of({ type: '[Home Page] Records Failed', error }))
    ))));

    updateRecord$ = createEffect(() => this._actions.pipe(
      ofType(updateRecord),
      exhaustMap(action => this._recordService.updateRecord(action.record).pipe(
        map( (result: Record) => {
          if (result){
            console.log('Effect Result: ', result);
            return { type: '[Home Page] Get Records' }
          }
          return { type: '[Home Page] Get Records',  error: true}
        }
        ),
        catchError(error => of({ type: '[Home Page] Update Record Failed', error }))
      ))
    ))

  constructor(
    private _actions: Actions,
    private _recordService: RecordService,
  ) { }
}
