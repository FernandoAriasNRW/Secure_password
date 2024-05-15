import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Record } from "../shared/interfaces/records";


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
    return this.http.get<Record[]>(`${environment.apiUrl}/Record`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    })
  }

}
