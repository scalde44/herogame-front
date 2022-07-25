import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  iniciarSesionForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearFormularioLogin();
  }


  crearFormularioLogin() {
    this.iniciarSesionForm = this.formBuilder.group({
      correo: [null, [Validators.required, Validators.email]],
      contraseña: [null, [Validators.required]],
      rol: [null, [Validators.required]]
    });
  }

  isValidFieldDatosLoginForm(field: string): boolean {
    return this.isValidFieldOfFormGeneral(this.iniciarSesionForm, field);
  }

  isValidFieldOfFormGeneral(form: FormGroup, field: string): boolean {
    return (
      (form.get(field)?.dirty || form.get(field)?.touched) as boolean &&
      form.get(field)?.invalid as boolean
    );
  }

  iniciarSesion(){
    const correo: string = this.iniciarSesionForm.get('correo')?.value;
    const contraseña: string = this.iniciarSesionForm.get('contraseña')?.value;
    const rol: string = this.iniciarSesionForm.get('rol')?.value;
    this.authService.login(correo, contraseña, rol);
  }

  iniciarConGoogle(){
    const rol: string = this.iniciarSesionForm.get('rol')?.value;
    if (rol !== null) {
      this.authService.googleSignIn(rol);
    }    
  }

}
