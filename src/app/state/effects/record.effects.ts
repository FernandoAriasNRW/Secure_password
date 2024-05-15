import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { RecordService } from "../../services/record.service";
import { Record } from "../../shared/interfaces/records";
import { getRecords } from "../actions";

@Injectable()
export class RecordEffects {

  record$ = createEffect(() => this._actions.pipe(
    ofType(getRecords),
    exhaustMap(() => this._recordService.getRecords().pipe(
      map( (result: Record[]) => {
        if (result){
          console.log('Records: ', result);
          return { type: '[Home Page] Records',  records: result }
        }
        return { type: '[Home Page] Get Records failed',  error: true}
      }
      ),
      catchError(error => of({ type: '[Home Page] Records Failed', error }))
    ))))

  constructor(
    private _actions: Actions,
    private _recordService: RecordService,
  ) { }
}
