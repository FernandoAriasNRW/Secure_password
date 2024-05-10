import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { AuthService } from "./auth.service";
import { User } from "../shared/interfaces/auth";


@Injectable({
  providedIn: 'root',
})
export class UserService {

  accessToken: string | null = "";
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ){}

  getUser(userId:string){
    this.accessToken = this.authService.getToken();
    console.log('Token in Get User: ', this.accessToken);
    return this.http.get<User | null>(`${environment.apiUrl}/User/${userId}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    })
  }

}
