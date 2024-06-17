import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Record } from "../shared/interfaces/records";
import Swal from "sweetalert2";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root',
})
export class RecordService {

  accessToken: string | null = "";
  userId: string | null = "";
  private _loading: boolean = false;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly toast: ToastrService,
  ) { }

  getRecords() {
    this.accessToken = this.authService.getToken();

    const result = this.http.get<Record[]>(`${environment.apiUrl}/Record`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    return result;

  }

  get loading(){
    return this._loading;
  }

  updateRecord(record: Record) {
    this.accessToken = this.authService.getToken();

    try {
      const result = this.http.put<Record>(`${environment.apiUrl}/Record/${record.id}`, record, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      }).pipe(result => {
        return result;
      });

      this.toast.success(
        "Record updated successfully"
      );

      return result;

    } catch (error) {
      this.toast.error(
        "Oops",
        "Something went wrong"
      );
      return of(record);
    }
  }

  createRecord(record: Record) {
    this.accessToken = this.authService.getToken();
    this.userId = this.authService.getUser();


    if (this.userId) {

      const newRecord: Record = {
        name: record.name,
        description: record.description,
        username: record.username,
        password: record.password,
        url: record.url,
        userId: this.userId
      }

      if (record.vaultId) {
        newRecord.vaultId = record.vaultId;
      }

      try {
        const result = this.http.post<Record>(`${environment.apiUrl}/Record`, newRecord, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }).pipe(result => {

        return result;
      });

      this.toast.success(
        "Record Created successfully"
      );

        return result;
      } catch (err) {
        this.toast.error(
          "Oops",
          "Something went wrong"
        );
        return of(record);
      }
    }
    this.toast.error(
      "Sorry",
      "Unauthorized access"
    );
    return of(record);
  }
}
