import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/feature/auth/service/auth.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {

  unirmeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormularioUnirme();
  }


  crearFormularioUnirme() {
    this.unirmeForm = this.formBuilder.group({
      juegoId: [null, [Validators.required]]
    });
  }

  isValidFieldDatosLoginForm(field: string): boolean {
    return this.isValidFieldOfFormGeneral(this.unirmeForm, field);
  }

  isValidFieldOfFormGeneral(form: FormGroup, field: string): boolean {
    return (
      (form.get(field)?.dirty || form.get(field)?.touched) as boolean &&
      form.get(field)?.invalid as boolean
    );
  }

  unirme() {
    const juego: string = this.unirmeForm.get('juegoId')?.value;
    localStorage.removeItem('gameId');
    localStorage.setItem('gameId', juego);
    this.router.navigate(['game/board']);
  }

  cerrar() {
    this.authService.logout();
  }

}
