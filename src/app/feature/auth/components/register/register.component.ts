import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.crearFormularioRegistro();
  }

  crearFormularioRegistro() {
    this.registroForm = this.formBuilder.group({
      correo: [null, [Validators.required, Validators.email]],
      contraseña: [null, [Validators.required]]
    });
  }

  isValidFieldDatosLoginForm(field: string): boolean {
    return this.isValidFieldOfFormGeneral(this.registroForm, field);
  }

  isValidFieldOfFormGeneral(form: FormGroup, field: string): boolean {
    return (
      (form.get(field)?.dirty || form.get(field)?.touched) as boolean &&
      form.get(field)?.invalid as boolean
    );
  }

  registrar(){
    const correo: string = this.registroForm.get('correo')?.value;
    const contraseña: string = this.registroForm.get('contraseña')?.value;
    this.authService.register(correo, contraseña);
  }

}
