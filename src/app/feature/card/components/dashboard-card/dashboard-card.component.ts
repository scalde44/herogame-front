import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {CardService} from '../../service/card.service';
import {Card} from '../../models/objects/card';
import {listCard} from '../../models/objects/listcards';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  title: string ="List of Cards";

  constructor(
    private cardService: CardService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
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
}
