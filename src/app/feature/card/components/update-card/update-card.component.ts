import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../../service/card.service';
import { Getcard } from '../../models/objects/getcard';
import { AuthService } from 'src/app/feature/auth/service/auth.service';


@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.scss'],
})
export class UpdateCardComponent implements OnInit {
  title: string = 'Actualizar Carta';
  card: Getcard ;
  cardForm: FormGroup;
  features : string[]= [];

  constructor(
    private cardService: CardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.editForm();
    let cardId = this.activatedRoute.snapshot.paramMap.get('id');
    this.cardService.cardById(cardId).subscribe((data) =>{
    this.card=data;
    this.setValues(this.card);
    console.log(this.card);
    })
    
      

    
  }

  editForm() {
    this.cardForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      power: [null, [Validators.required]],
      features: [null, [Validators.required]],
      imageUrl: [null, [Validators.required]],
    });
  }

  setValues(card : Getcard){
    this.cardForm.patchValue({
      id: this.card.id,
      name: this.card.name,
      power: this.card.power,
      features: this.card.features,
      imageUrl:this.card.imageUrl
    })
  }

  

  updateCard() {
    let cardId = this.activatedRoute.snapshot.paramMap.get('id');
    
    const card: Getcard = {
      id: this.cardForm.get('id')?.value,
      name: this.cardForm.get('name')?.value,
      power: this.cardForm.get('power')?.value,
      features: this.features,
      imageUrl: this.cardForm.get('imageUrl')?.value,
    };
    console.log(card);
    this.cardService.updateCard(cardId, card).subscribe(l => alert('Carta actualizada')
    )};

  addFeature(){
    this.features.push(this.cardForm.get('features')?.value);
    
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

  dashboard() {
    this.router.navigate(['card/dashboard']);
  }

  cerrar() {
    this.authService.logout();
  }
}
