import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CardService} from '../../service/card.service';
import {Card} from '../../models/objects/card';
import { AuthService } from 'src/app/feature/auth/service/auth.service';


@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
 
  title: string = 'Crear Carta';
  cardForm : FormGroup;
  features : string[]= [];
  constructor(
    private cardService: CardService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.createForm()
  }
  
  createForm(){
    
  this.cardForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    power: [null, [Validators.required]],
    features: [null, [Validators.required]],
    imageUrl: [null, [Validators.required]],
    
  });
  }
  createCard(){
       
    const card : Card={
      name: this.cardForm.get('name')?.value,
      power: this.cardForm.get('power')?.value,
      features: this.features,
      imageUrl: this.cardForm.get('imageUrl')?.value
    }
    
    this.cardService.createCard(card).subscribe(l => alert('Carta creada')
  )};
  dashboard(){
    this.router.navigate(['card/dashboard'])
  }
  
  addFeature(){
    this.features.push(this.cardForm.get('features')?.value);
    console.log()
  }

  cerrar() {
    this.authService.logout();
  }

  
  isValidFieldDatosLoginForm(field: string): boolean {
    return this.isValidFieldOfFormGeneral(this.cardForm, field);
  }

  isValidFieldOfFormGeneral(form: FormGroup, field: string): boolean {
    return (
      (form.get(field)?.dirty || form.get(field)?.touched) as boolean &&
      form.get(field)?.invalid as boolean
    );
  }
}

