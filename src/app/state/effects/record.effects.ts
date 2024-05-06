import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { RecordService } from "../../services/record.service";

@Injectable()
export class RecordEffects {

  constructor(
    private _action: Actions,
    private _recordService: RecordService,
  ) { }
}
