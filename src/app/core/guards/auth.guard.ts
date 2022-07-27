import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUtil } from 'src/app/shared/models/auth-util';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private fireauth: AngularFireAuth,
    private alertService: AlertService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.fireauth.authState.pipe(      
      map((user)=> {
        if (user) {
          return true;
        }
        this.alertService.alert(
          AuthUtil.INFO_ICON,
          AuthUtil.INFORMATION_TITLE,
          AuthUtil.LOGIN_REQUIRED
        );
        this.router.navigate(['auth/login']);
        return false;
      })
    );
  }

}
