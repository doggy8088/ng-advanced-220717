import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class FormDirtyGuard implements CanDeactivate<LoginComponent> {
  canDeactivate(
    component: LoginComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (component.form.dirty) {
        return false;
      } else {
        return true;
      }
  }

}
