import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { AuthUtil } from 'src/app/shared/models/auth-util';
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
            this.saveUser(res.user.email as string, res.user.displayName as string, res.user.photoURL as string, 'ADMIN');
          }
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
          this.saveUser(res.user?.email as string, res.user?.displayName as string, res.user?.photoURL as string, 'ADMIN');
        }
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

  private saveUser(email: string, userName: string, urlImage: string, rol: string): void {
    let user = this.userService.armarUsuario(email, userName, urlImage, rol);
    console.log(user);
    this.userService.crearUsuario(user)
      .subscribe(
        l => console.log("resultado peticion", l)
      );
  }
}
