import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ConeccionService } from './coneccion.service';


@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private comunicacionService: ConeccionService,
    private Router: Router
  ) { }

  canActivate(): boolean {
    
    if (!this.comunicacionService.isAuthenticated()) {
      this.Router.navigate(['proteccion']);     
      return false;
    } else if (this.comunicacionService.isAuthenticated()) {
      setTimeout(() => {
        localStorage.clear()        
      }, 30000);
      return true;
    }
  }

  TokenValide(token) {
    const re = /(?=.*[0-9])(?=.*[A-Z])[A-Za-z0-9]{100}/;
    return re.test(token);
  }

  // canActivate() {
  //   if
  //   return true;
  //   /* console.log(this.comunicacionService.user.rol); */

  //      if (
  //     this.comunicacionService.user.rol === "ADMIN_ROLE" &&
  //     this.TokenValide(this.comunicacionService.authToken)
  //   ) {
  //     return false;
  //   } else if (this.comunicacionService.user.rol === undefined) {
  //     return false;
  //   } else {
  //     alert("ruta protegida que haces?");
  //     console.log("Bloqueado por el ADMIN GUARD");
  //     this.comunicacionService.logout();

  //     return false;
  //   }
  // }


}
