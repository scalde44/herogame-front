import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/feature/auth/service/auth.service';
import { CrearJuegoCommand } from '../../models/crear-juego-command';
import { StartGameCommand } from '../../models/start-game-command';
import { JuegoService } from '../../services/juego.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  juegoForm: FormGroup;
  jugadoresId: string[] = [];
  juegoId: string;

  constructor(
    private formBuilder: FormBuilder,
    private juegoService: JuegoService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormularioJuego();
  }


  crearFormularioJuego() {
    this.juegoForm = this.formBuilder.group({
      juegoId: [null, [Validators.required]],
      jugadorId: [null, [Validators.required]]
    });
  }

  isValidFieldDatosLoginForm(field: string): boolean {
    return this.isValidFieldOfFormGeneral(this.juegoForm, field);
  }

  isValidFieldOfFormGeneral(form: FormGroup, field: string): boolean {
    return (
      (form.get(field)?.dirty || form.get(field)?.touched) as boolean &&
      form.get(field)?.invalid as boolean
    );
  }

  crearJuego() {
    const juego: string = this.juegoForm.get('juegoId')?.value;
    this.jugadoresId.push(localStorage.getItem('playerId'));
    let crearJuego: CrearJuegoCommand = {
      gameId: juego,
      usersId: this.jugadoresId
    };
    console.log(crearJuego);

    this.juegoService.crearJuego(crearJuego)
      .subscribe(l => alert('Juego creado'));

    this.jugadoresId = [];
    this.juegoForm.reset();
    this.juegoId = juego;
  }

  agregar() {
    const id: string = this.juegoForm.get('jugadorId')?.value;
    if (id !== null) {
      this.jugadoresId.push(id);
    }

  }

  iniciar() {
    if (this.juegoId) {
      let startGameCommand: StartGameCommand = {
        gameId: this.juegoId
      }
      this.juegoService.iniciarJuego(startGameCommand).subscribe(() => console.log('petición exitosa'));
      localStorage.removeItem('gameId');
      localStorage.setItem('gameId', this.juegoId);
      this.router.navigate(['game/board']);
    }
  }

  cerrar() {
    this.authService.logout();
  }

}
