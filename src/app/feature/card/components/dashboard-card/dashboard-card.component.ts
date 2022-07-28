import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CardService} from '../../service/card.service';
import {listCard} from '../../models/objects/listcards';
import { AuthService } from 'src/app/feature/auth/service/auth.service';


@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  
})
export class DashboardCardComponent implements OnInit {

  title: string ="Cartas";
  page: number=1;
  constructor(
    private cardService: CardService,
    private router: Router,
    private authService: AuthService
  ) { }

  
  cards: listCard[];
  cardId: string;
  ngOnInit(): void {
    
    this.cardService.getAllCards().subscribe(data =>{
      this.cards = data;
      
      console.log(data);      
    })   
  }

  updateCard(id:string){
    this.router.navigate(['/card/update', id])
    console.log(id);
  }

  createCard(){
    this.router.navigate(['/card/create']);
  }

  deleteCard(id:string){
    
    this.cardService.deleteCard(id).subscribe(data =>{
      console.log(data);
    })
    
  }  

  cerrar() {
    this.authService.logout();
  }
}
