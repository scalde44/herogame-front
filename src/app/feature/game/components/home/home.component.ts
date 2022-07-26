import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearJuegoCommand } from '../../models/crear-juego-command';
import { JuegoService } from '../../services/juego.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  juegoForm: FormGroup;
  jugadoresId: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private juegoService: JuegoService
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

  crearJuego(){
    const juego: string = this.juegoForm.get('juegoId')?.value;
    let crearJuego = {
      gameId: juego,
      usersId: this.jugadoresId
    };  
    
    this.juegoService.crearUsuario(crearJuego as CrearJuegoCommand)
    .subscribe(l => alert('Juego creado'));
    
  }

  agregar() {
    const id: string = this.juegoForm.get('jugadorId')?.value;
    if (id !== null) {
      this.jugadoresId.push(id);
    }   

  }
}
