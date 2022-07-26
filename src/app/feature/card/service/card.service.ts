import { Injectable } from '@angular/core';
import {Card} from '../../card/models/objects/card';
import {Getcard} from '../../card/models/objects/getcard';
import {listCard} from '../../card/models/objects/listcards';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

const API_ENDPOINT = environment.apiUrl;
@Injectable(
  
)
export class CardService {

  

  constructor(private httpClient: HttpClient ) { }

 createCard(form:Card): Observable<Card>{
  
  return this.httpClient.post<Card>(`${API_ENDPOINT}/cards`, form);

}

public updateCard(id:any, form:Card): Observable<String>{
  
  return this.httpClient.put(`${API_ENDPOINT}/cards/` + id, form, {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
    responseType: 'text',
  });
  
}

public deleteCard(id:any): Observable<String>{
  
  return this.httpClient.delete(`${API_ENDPOINT}/cards/` + id , {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
    responseType: 'text',
  })
    
  

}
public getAllCards(): Observable<listCard[]>{
  
  return this.httpClient.get<listCard[]>(`${API_ENDPOINT}/cards`); 
}

public cardById(id:any): Observable<Getcard>{
  return this.httpClient.get<Getcard>(`${API_ENDPOINT}/cards/` + id);
}
}
