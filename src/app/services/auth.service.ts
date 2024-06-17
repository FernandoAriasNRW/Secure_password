import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { Login, LoginResponse } from "../shared/interfaces/auth";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(data: Login){
      const response = this.http.post<LoginResponse>(`${environment.apiUrl}/auth/Login`, data)

      return response;

  }

  logout(){
    return true;
  }

  register(){

  }

  getUser(){
    console.log(localStorage.getItem('user_id'));
    return localStorage.getItem('user_id');
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }
}
