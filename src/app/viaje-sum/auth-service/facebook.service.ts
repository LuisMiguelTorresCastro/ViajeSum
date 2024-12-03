import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {
  [x: string]: any;
  private apiUrl = 'http://localhost:3000/facebook'; // URL de tu API backend para manejar la autenticación de Facebook

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión con Facebook (envía el token de Facebook al backend)
  loginWithFacebook(accessToken: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { accessToken });
  }

  // Método para obtener información del perfil de Facebook
  getFacebookProfile(accessToken: string): Observable<any> {
    return this.http.get<any>(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
  }

  // Método para cerrar sesión con Facebook (si lo necesitas en tu backend)
  logoutFacebook(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }
}
