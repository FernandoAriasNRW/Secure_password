import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Record } from "../shared/interfaces/records";
import Swal from "sweetalert2";
import { of } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class RecordService {

  accessToken: string | null = "";
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ){}

  getRecords(){
    this.accessToken = this.authService.getToken();

      const result = this.http.get<Record[]>(`${environment.apiUrl}/Record`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      return result;

  }

  updateRecord(record: Record){
    this.accessToken = this.authService.getToken();

    try {
      const result = this.http.put<Record>(`${environment.apiUrl}/Record/${record.id}`, record, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      Swal.fire("Great!", "Record succesfully updated", "success");

      return result;
    } catch (error){
      Swal.fire("Oops! Something went wrong", "Cannot update record", "error");
        return of(record);
    }
  }

}
