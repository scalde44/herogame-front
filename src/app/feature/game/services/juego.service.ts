import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearJuegoCommand } from '../models/crear-juego-command';
import { StartGameCommand } from '../models/start-game-command';

const API_ENDPOINT = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(private httpClient: HttpClient) { }

  public crearJuego(CrearJuegoCommand: CrearJuegoCommand): Observable<string> {
    return this.httpClient.post(`${API_ENDPOINT}/game/create`, CrearJuegoCommand, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      responseType: 'text',
    });
  }

  public iniciarJuego(startGameCommand: StartGameCommand): Observable<string> {
    return this.httpClient.post(`${API_ENDPOINT}/game/start`, startGameCommand, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      responseType: 'text',
    });  
  }

}
