import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy
} from "@angular/core";
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from "ngx-loading";
import { ConeccionService } from 'src/servicios/coneccion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();


interface Datos{
  success: boolean;
  msg: string;
  token: any;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // efectico loading
  @ViewChild("ngxLoading") ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild("customLoadingTemplate") customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = "rgb(42, 206, 42)";
  public secondaryColour = "rgb(247, 64, 8)";
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any>;
  public fullscreenloadingdecision = true;
  public radio = "3px";
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
  // LOADER BOOLEANO
  public loading = false;

  // fin efectico loading

  usuario: string;
  clave: string;

  // token
  token: any;

  constructor(private Com: ConeccionService, private router: Router) { }

  ngOnInit() {
  }

  go(){
    this.loading = true;
    const user = {
      usuario: this.usuario,
      clave : this.clave
    }
    this.Com.login(user).subscribe( (data:Datos)=>{
      if (data){
        if (data.success){
          localStorage.setItem('ok',data.success.toString());
           this.token = data.token;
          localStorage.setItem('token',this.token);
          const token = localStorage.getItem("token");
          const isExpired = helper.isTokenExpired(this.token.toString());     
          this.loading = false;
          // begin swal
          Swal.fire({
            title: "Ingreso Autorizado Bienvenido ",
            animation: false,
            type: "success",
            customClass: "animated tada",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ingresa al Dashboard!"
          }).then(result => {
            if (result.value) {
              this.router.navigate(["/plataforma"]);
            }
          });
          // fIN SWAL


        } else{
          localStorage.setItem('ok',false.toString());
          setTimeout(()=>{
            this.loading=false;
          Swal.fire({
            title: "Clave Incorrecta ",
            type: "error"
          });

          },3000);


        }
      } else{
        const conteo= timer(2500);
        conteo.subscribe(x=>{
          this.loading=false;
          Swal.fire({
            title: "Error de servidor ",
            type: "error"
          });
        });

      }
    }
        
      
    )


  }


}
