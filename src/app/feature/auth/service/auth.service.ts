import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { AuthUtil } from 'src/app/shared/models/auth-util';
import { UserGet } from 'src/app/shared/models/user-get';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  login(email: string, password: string, rol: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user?.emailVerified) {
          if (rol === 'ADMIN') {
            this.router.navigate(['admin/home']);
          }
          else {
            this.router.navigate(['game/home']);
          }
          this.buscarPorCorreo(res, rol);
        } else {
          this.alertService.alert(
            AuthUtil.INFO_ICON,
            AuthUtil.INFORMATION_TITLE,
            AuthUtil.UNVERIFIED_EMAIL
          );
        }
      },
      (err) => {
        this.alertService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          AuthUtil.WRONG_MESSAGE
        );
        this.router.navigate(['auth/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.router.navigate(['auth/login']);
        this.sendEmailForVerification(res.user as firebase.User);
      },
      (err) => {
        this.alertService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          err.message
        );
        this.router.navigate(['auth/register']);
      }
    );
  }

  sendEmailForVerification(user: firebase.User) {
    user.sendEmailVerification().then(
      () => {
        this.alertService.alert(
          AuthUtil.INFO_ICON,
          AuthUtil.INFORMATION_TITLE,
          AuthUtil.VERIFY_EMAIL
        );
      },
      (err) =>
        this.alertService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          AuthUtil.MESSAGE_NOT_SENT
        )
    );
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('playerId');
        localStorage.removeItem('gameId');
        this.router.navigate(['auth/login']);
      },
      (err) =>
        this.alertService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          err.message
        )
    );
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () =>
        this.alertService.alert(
          AuthUtil.INFO_ICON,
          AuthUtil.INFORMATION_TITLE,
          AuthUtil.VERIFY_EMAIL
        ),
      (err) =>
        this.alertService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          AuthUtil.WRONG_MESSAGE
        )
    );
  }

  googleSignIn(rol: string) {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        if (rol === 'ADMIN') {
          this.router.navigate(['admin/home']);
        }
        else {
          this.router.navigate(['game/home']);
        }
        this.buscarPorCorreo(res, rol);
      },
      (err) => {
        this.alertService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          err.message
        );
        this.router.navigate(['auth/login']);
      }
    );
  }

  private buscarPorCorreo(res: firebase.auth.UserCredential, rol: string): void {
    this.userService.buscarPorCorreo(res.user.email).subscribe(user => {
      if (!user) {
        this.saveUser(
          res.user?.email as string,
          res.user?.displayName as string,
          res.user?.photoURL as string,
          rol);
      } else {
        console.log(user);
        
        this.guardarLocalStorage(JSON.stringify(user));
      }
    });
  }

  private saveUser(email: string, userName: string, urlImage: string, rol: string): void {
    let user = this.userService.armarUsuario(email, userName, urlImage, rol);
    console.log(user);
    this.userService.crearUsuario(user)
      .subscribe(
        user => {
          console.log("resultado peticion", user);
          this.guardarLocalStorage(user);
        }
      );
  }

  private guardarLocalStorage(user: string): void {
    let userConverted: UserGet = JSON.parse(user);
    localStorage.removeItem('playerId');
    localStorage.setItem('playerId', userConverted.id);

  }
}
