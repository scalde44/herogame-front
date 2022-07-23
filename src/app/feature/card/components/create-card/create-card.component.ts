import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  cardForm = new FormGroup({
    name : new FormControl('', Validators.required),
    power: new FormControl('',Validators.required )

  })
  constructor() { }

  ngOnInit(): void {
  }

}
