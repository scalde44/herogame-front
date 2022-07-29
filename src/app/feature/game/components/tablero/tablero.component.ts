import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/feature/auth/service/auth.service';
import { EventUtil } from 'src/app/shared/models/event-util';
import { UserService } from 'src/app/shared/services/user.service';
import { DistributedCards } from '../../events/distributed-cards';
import { Gamecard } from '../../models/gamecard';
import { WebsocketService } from '../../services/websocket.service';
import { Identity } from '../../valueobjects/identity';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss'],
})
export class TableroComponent implements OnInit {
  cartasJugador: Gamecard[] = [];
  cartasTablero: Gamecard[] = [];
  gameId: string = '';
  playerId: string = '';
  constructor(
    private authService: AuthService,
    private webSocketService: WebsocketService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.cargarValores();
    this.obtenerDatosJuegoWs();
  }

  private cargarValores(): void {
    this.gameId = localStorage.getItem('gameId');
    this.playerId = localStorage.getItem('playerId');
  }

  obtenerDatosJuegoWs() {
    console.log(this.gameId);
    this.webSocketService.iniciar(this.gameId);
    this.webSocketService.messages.subscribe((event) => {
      console.log(event);
      this.procesarMensajeWebSocket(event);
    });
  }
  procesarMensajeWebSocket(event: any) {
    if (event.type === EventUtil.DISTRIBUTED_CARDS_TYPE) {
      const evento: DistributedCards = event as DistributedCards;
      this.distrbuirCartasPorJugador(evento.playerId, evento.gameCards);
    }
  }
  distrbuirCartasPorJugador(playerId: Identity, gameCards: Set<Gamecard>) {
    console.log("ingreso con gameid =>" + this.gameId +" y playerId => "+ this.playerId);
    this.userService.getInformaciónUsuario(this.gameId, this.playerId).subscribe(user => {
      console.log("ingreso con gameid =>" + this.gameId +" y playerId => "+ this.playerId);
      console.log(user);
      console.log('if -> ' + user.playerId + ' === ' +playerId.uuid);
      if (user.playerId === playerId.uuid) {
        gameCards.forEach(carta => this.cartasJugador.push(carta));
      }
    });
  }

  drop($event: CdkDragDrop<Gamecard[]>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    }
  }

  cerrar() {
    this.authService.logout();
  }
}
