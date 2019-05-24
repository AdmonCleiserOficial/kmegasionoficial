import { Component, TemplateRef, Inject } from "@angular/core";
import { ConeccionService } from "src/servicios/coneccion.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormularioComponent } from './formulario/formulario.component';
import { Overlay } from '@angular/cdk/overlay';
import { routerTransition } from './estoEsAspero';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations:[routerTransition]
})
export class AppComponent {
  title = "Kmegavisión";
  public nombre: string;
  public correo: string;
  public ciudad: string;
  public tratamiento: string;
  public mensaje: string;

  // modales bootstrap
  constructor(
    private serviciobackend: ConeccionService,
    public dialog: MatDialog,
    private overlay: Overlay
  ) {
    console.log(`${2 + 2}`);
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(FormularioComponent,{

      width: '500px',
      maxHeight: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  expression() {
    const objetoParaEnviar = {
      nombre: this.nombre,
      correo: this.correo,
      ciudad: this.ciudad,
      mensaje: this.mensaje
    };
    console.log(objetoParaEnviar);
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }


  datosMetidos() {
    const objetoParaEnviar = {
      nombre: this.nombre,
      correo: this.correo,
      ciudad: this.ciudad,
      mensaje: this.mensaje
    };
    console.log(objetoParaEnviar);
  }
}
