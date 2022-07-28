import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/feature/auth/service/auth.service';
import { Getcard } from 'src/app/feature/card/models/objects/getcard';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {

  cartasJugador: Getcard[] = [];
  cartasTablero: Getcard[] = [];


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obtenerCartas();
  }

  obtenerCartas() {
    // llamar al servicio que obtiene las cartas de cada jugador
    let cartas: Getcard[] = [
      {
        id: 'dasdre-fsdfwerqwe-fsdqw3h-fdserw',
        name: 'Spider man',
        power: 50,
        features: ['telaraña', 'agilidad'],
        imageUrl: 'url image'
      },
      {
        id: 'utyu-hgjgh-dasder-fsdre',
        name: 'Thanos',
        power: 87,
        features: ['Fuerza', 'agilidad'],
        imageUrl: 'url image'
      },
      {
        id: 'erhfghf-iyu8i78-dcdas-eqregdf',
        name: 'Iron man',
        power: 77,
        features: ['Armadura', 'Analisis y ciencia'],
        imageUrl: 'url image'
      }

    ]
    this.cartasJugador = cartas;
  }

  drop($event: CdkDragDrop<Getcard[]>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    }
    else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    }
  }

  cerrar() {
    this.authService.logout();
  }

}
