import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const API_ENDPOINT = environment.apiUrl;
const USER_IMAGE_DEFAULT = 'https://storage.googleapis.com/media.clinicavisualyauditiva.com/images/2019/11/211fd983-default-user-image.png';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(public httpClient: HttpClient) { }

  public crearUsuario(user: User): Observable<string> {
    return this.httpClient.post(`${API_ENDPOINT}/users`, user, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      responseType: 'text',
    });
  }

  public listarUsuarios(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${API_ENDPOINT}/users`);
  }

  public buscarPorCorreo(correo :string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${API_ENDPOINT}/user/${correo}`);
  }

  public armarUsuario(email: string, name: string, image: string, role: string): User {  
    let user = {
      "name": name || this.armarNombre(email),
      "email": email,
      "image": image || USER_IMAGE_DEFAULT,
      "role": role
    };

    return user;
  }

  private armarNombre(email:string): string {
    return email.split('@')[0];
  }
}


