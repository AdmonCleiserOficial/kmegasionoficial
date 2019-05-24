import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy
} from "@angular/core";
import { ConeccionService } from 'src/servicios/coneccion.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from "ngx-loading";

interface Servidor {
  success: boolean;
  articulos: object;
}
interface Listo{
  exito: boolean; 

}




interface Articulos{
  video: string;
  titulo: string;
  articulo: string;
  date: string;
  imagen: string;
}

@Component({
  selector: 'app-testeo',
  templateUrl: './testeo.component.html',
  styleUrls: ['./testeo.component.css']
})
export class TesteoComponent implements OnInit {

  public index: string = `
  <br>
<br>
<br>
<br>
<h1 >
  testeo works!
</h1  >
<p> {{msg}}</p>
<h3 class="text-center">imagen</h3>
<div
class="w-100 border d-flex justify-content-center"
>
<img 
[src]="url"
alt=""
>
</div>
  `;

  public url: string = `https://cdn.pixabay.com/photo/2016/06/05/23/56/bird-1438504__480.jpg`
  public msg: string = "mi mensaje";
  public condicion: boolean;

  public PublicacionesAdministrador: any;
  public iframe: any;
  public arregloVacio = [];
  // efecto LOADING
  @ViewChild("ngxLoading") ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild("customLoadingTemplate") customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = "rgb(42, 206, 42)";
  public secondaryColour = "rgb(247, 64, 8)";
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any>;
  public fullscreenloadingdecision = true;
  public radio = "20px";
  public colorback = "#000000d2";

  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: this.radio,
    fullScreenBackdrop: this.fullscreenloadingdecision,
    backdropBackgroundColour: this.colorback
  };

  // FIN EFECTO LOADING

  // LOADER BOOLEANO
  public loading = false;
constructor(
    private comunique: ConeccionService,
    private sanitazer: DomSanitizer
  ) {
    if (this.PublicacionesAdministrador){

      for (let i=0; i< this.PublicacionesAdministrador.length;i++ ){
        this.arregloVacio.push(this.sanitazer.bypassSecurityTrustResourceUrl(this.PublicacionesAdministrador[i].video));
      }
    }
  }
  ngOnInit() {

    let expresionRegular = /(?=.*[-.a-z-AZ])(?=.*[0-9]){14,}/;

    if (localStorage.getItem("ok") && localStorage.getItem("token") && localStorage.getItem("token").length > 200 && expresionRegular.test(localStorage.getItem("token"))){
      this.condicion = true;
    }else {
      this.condicion = false;
    }

    this.comunique.obtengaBlog()
    .subscribe((x:Servidor)=>{
      this.loading=true;

      setTimeout(() => {
        
        if (x){
          console.log( 'que carajos llega del servidor' );
          console.log(x);
          if (x.success){
            this.loading=false;
            
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Cargado con exito de la base de datos',
              showConfirmButton: false,
              timer: 1500
            })
            this.PublicacionesAdministrador = x.articulos;
            console.log(`Mirando que me llega del servidor sii`);
            console.log(this.PublicacionesAdministrador);
  
            
          }
  
        }
      }, 2000);
    });
  }
//esta funcion se dispara cuando usted le da clcik a un botton 
  borrar(articulo){

    if (this.condicion){


       // Swal.fire(`El id del articulo es ${articulo._id}`);
   this.PublicacionesAdministrador = this.PublicacionesAdministrador.filter(h=> h !== articulo);
   // aca despues hacemos para el servidor
   this.comunique.BorrarArticulo(articulo._id).subscribe((data: Listo)=>{
        
    console.log("mirando data");
    if(data.exito){ 
      var exito = "El articulo se borro correctamente";
      var error = "Error";
        }
    if(data.exito == false){
     let b = " altGr +  } y despues espacio ";
  
    }

   }
   )

   //fin de suscribe 


      

    }else{
      alert(` Solo puede borrar el admin`);
    }

 

  }

}
