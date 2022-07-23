import { Injectable } from '@angular/core';
import {Card} from '../../card/models/objects/card';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  url: string ="http//localhost:8080/api"

  constructor(public httpClient: HttpClient ) { }

//public createCard(form:Card): Observable<String>{

//}
}
