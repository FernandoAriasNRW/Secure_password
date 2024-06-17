import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Image } from "../shared/interfaces/upload";
import { of } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class UploadService {

  accessToken: string | null = "";
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ){}

  uploadAvatar(file: File) {
    console.log('Upload Service: ', file);
    if (file){
      const formData = new FormData();
      formData.append('file', file);
      this.accessToken = this.authService.getToken();
      return this.http.post<Image | null>(`${environment.apiUrl}/User/addPhoto`, formData,{
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })
    }
    return of(null);
  }

}
