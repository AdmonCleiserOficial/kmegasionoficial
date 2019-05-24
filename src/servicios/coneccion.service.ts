import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

// servicion que conecta a backend
const httpoptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
const helper = new JwtHelperService();
@Injectable({
  providedIn: "root"
})
export class ConeccionService {
  private miservidor = "https://ojopicho.herokuapp.com/";
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
  constructor(private comunique: HttpClient) { }

  EnviarDatos(datosFormulario) {
    return this.comunique
      .post(this.miservidor + "formulario", datosFormulario, httpoptions)
      .pipe(catchError(this.handleError("Enviar Datos carajo")));
  }

  ObtenerClientes() {
    return this.comunique
      .get(this.miservidor + "obtener")
      .pipe(catchError(this.handleError("Obtener Clientes")));
  }
  recojerDatos() {
    //recojer datos
  }

  login(xxx) {
    return this.comunique.post(this.miservidor + "login", xxx, httpoptions)
      .pipe(catchError(this.handleError("login")));
  }
  isAuthenticated() {
    if (this.loadToken()) {
      return true;
    } else {
      return false;
    }
  }
  loadToken() {
    const ok = localStorage.getItem("ok");
    const token = localStorage.getItem("token");
    const isExpired = helper.isTokenExpired(token);

    if (
      ok == true.toString() && !isExpired && token
    ) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.clear();
  }
  Irule() {
    return this.comunique.get(this.miservidor + "Irule")
      .pipe(catchError(this.handleError("I rule ")));
  }
  //@desc  enviar la imagen al servidor
  //@as    ya no la usare
  enviarMedia(media: File) {
    const Archivo = new FormData();
    Archivo.append('image', media);
    return this.comunique.post(this.miservidor + "media", Archivo)
      .pipe(catchError(this.handleError("media")));
  }
  //@desc  Envio todo el modelo Blog
  enviePostBlog(blog) {
    return this.comunique.post(this.miservidor + "blog", blog, httpoptions)
      .pipe(catchError(this.handleError("enviePostBlog")));
  }
  obtengaBlog() {
    return this.comunique.get(this.miservidor + "obtenerblog")
      .pipe(catchError(this.handleError("obtengaBlog")));
  }

  getcaptionNigga() {
    return this.comunique.get(this.miservidor + "getCaption")
      .pipe(catchError(this.handleError("getcaptionNigga")));
  }

  dskfnhdsjf() {
    return this.comunique.get(this.miservidor + "copyright")
      .pipe(catchError(this.handleError("dskfnhdsjf")));

  }
  dskfjbh() {
    return this.comunique.get(this.miservidor + "resetqueries")
      .pipe(catchError(this.handleError("dskfjbh")));

  }
  BorrarArticulo(articulo) {
    let a = "https://ojopicho.herokuapp.com/borrar/23432423534324234";
    return this.comunique.delete(this.miservidor + "borrar/"+ articulo)
      .pipe(catchError(this.handleError("Delete")));
  }

}
