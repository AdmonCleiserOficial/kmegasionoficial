import { Component, OnInit } from '@angular/core';
import { ConeccionService } from "src/servicios/coneccion.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Overlay } from '@angular/cdk/overlay';
import { FormularioComponent } from '../formulario/formulario.component';
import { Subscription, Observable, interval } from 'rxjs';
interface Hey {
  a: string;
  b: string;
  c: string;
  d: string;

}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "Kmegavisión";
  Estas_Cuidando_Tus_Ojos_Realmente = "";
  Cleiser_Business_Group = "";
  PasarelasDePago = "";
  cleiserbusiness = "";
  public nombre: string;
  public correo: string;
  public ciudad: string;
  public tratamiento: string;
  public mensaje: string;
  public Titulo1: string;
  private subscription: Subscription;
  private subscription2: Subscription;
  sourceABC: Observable<number> = interval(1000);
  sourceHCQ: Observable<number> = interval(3000);

  // modales bootstrap
  constructor(
    private serviciobackend: ConeccionService,
    public dialog: MatDialog,
    private overlay: Overlay
  ) {
    console.log(`${2 + 2}`);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    // this.subscription2.unsubscribe();
  }

  ngOnInit() {
    this.serviciobackend.getcaptionNigga().subscribe((data: any) => {
      if (data) {
        this.Titulo1 = data.msg;
      }
      this.subscription = this.sourceABC.subscribe(val => {
        this.fdhgjksdfbgdfh();
      });

      // this.subscription2 = this.sourceHCQ.subscribe(val=>{
      //   this.djklfnhdsjkfh();
      // });

    });
  
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

  expression() {
    const objetoParaEnviar = {
      nombre: this.nombre,
      correo: this.correo,
      ciudad: this.ciudad,
      mensaje: this.mensaje
    };
    console.log(objetoParaEnviar);
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(FormularioComponent, {

      width: '500px',
      maxHeight: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
  djklfnhdsjkfh(){
    this.serviciobackend.dskfjbh().subscribe((data:Hey)=>{
      if (data){
        this.Cleiser_Business_Group = data.b;
        this.cleiserbusiness = data.d || "https://www.facebook.com/CleiserBusinessGroupSAS/";
        
      }
    });
  }

  fdhgjksdfbgdfh() {
    this.serviciobackend.dskfnhdsjf().subscribe((data: Hey) => {

      if (data) {
        this.Estas_Cuidando_Tus_Ojos_Realmente = data.c;
        this.Cleiser_Business_Group = data.b;
        this.PasarelasDePago = data.a;
        this.cleiserbusiness = data.d || "https://www.facebook.com/CleiserBusinessGroupSAS/";
        console.log( data );
        console.log( "B " );
        console.log( data.b );
        console.log( "D " );
        console.log(  data.d);
    
        
      }

    });

  }


}
