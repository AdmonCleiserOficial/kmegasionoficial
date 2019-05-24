import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy
} from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from "ngx-loading";
import { NgFlashMessageService } from "ng-flash-messages";
import { of, merge, Observable, observable, Subscription, timer } from "rxjs";
import { mapTo, delay, tap } from "rxjs/operators";
import { SelectItem } from "primeng/api";

// librerias formularios reactivos
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { Usuarios } from "../modelos/usuarios";
import { ValidacionesPersonalizadas } from "src/app/_validadores/ValidacionesPersonalizadas";
import { ConeccionService } from "src/servicios/coneccion.service";

export interface Tratamiento {
  value: string;
  viewValue: string;
}

interface DataModel {
  success: boolean;
  msg: string;
  password: string;
  hash: string;
}

interface Seleccion{
  name: string;
  code: string;
}

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"]
})
export class FormularioComponent implements OnInit {
  formReg: FormGroup;
  // prueba select
  selectedCity1: Seleccion;
  treatments: SelectItem[];
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

  trata: string;
  mensajitoFondo: string;
  nombre: string;
  mensaje: string;
  correo: string;

  Tratamientos: string;
  default: string = "Cual es tu tratamiento";

  opciones = [
    { nombre: "Tratamiento para las Cataratas", value: "Cataratas" },
    { nombre: "Tratamiento para las Glaucoma", value: "Glaucoma" },
    { nombre: "Tratamiento para las Presbicia", value: "Presbicia" },
    {
      nombre: "Tratamiento para las Astigmagmatismo",
      value: "Astigmagmatismo"
    },
    { nombre: "Tratamiento para las Hipermetropía", value: "Hipermetropía" },
    { nombre: "Tratamiento para las Miopía", value: "Miopía" },
    { nombre: "Tratamiento para las Pterigión", value: "Pterigión" }
  ];

  constructor(
    public validacionesPersonalizadas: ValidacionesPersonalizadas,
    private formBuilder: FormBuilder,
    private router: Router,
    private msj: NgFlashMessageService,
    private conecteServidor: ConeccionService
  ) {
    this.treatments = [
      { label: "Cual es tú Tratamiento", value: null },
      { label: "Tratamiento para las Cataratas", value: {  name: "Cataratas"} },
      { label: "Tratamiento para la Glaucoma", value: {name: "Glaucoma" } },
      { label: "Tratamiento para la Presbicia", value: { name: "Presbicia" } },
      { label: "Tratamiento para el Astigmagmatismo", value: { name: "Astigmagmatismo" } },
      { label: "Tratamiento para la Hipermetropía", value: {  name: "Hipermetropía" } },
      { label: "Tratamiento para la Miopía", value: {  name: "Miopía" } },
      { label: "Tratamiento para el Pterigión", value: { name: "Pterigión" } }
    ];
  }
  // GETTERS
  get nombregetter() {
    return this.formReg.get("nombre");
  }
  get correogetter() {
    return this.formReg.get("correo");
  }
  get telefonogetter() {
    return this.formReg.get("telefono");
  }
  get tratamientogetter() {
    return this.formReg.get("Tratamientos");
  }
  get msjsgetter() {
    return this.formReg.get("mensaje");
  }
  get ciudadgetter() {
    return this.formReg.get("ciudad");
  }
  // FIN GETTERS

  ngOnInit() {
    this.formReg = this.formBuilder.group({
      nombre: ["", Validators.required],
      correo: [
        "",
        [
          Validators.required,
          Validators.email,
          this.validacionesPersonalizadas.Busque(/@/i)
        ]
      ],
      telefono: [
        "",
        [
          Validators.required,
          this.validacionesPersonalizadas.tieneNumero(/^[-\s\.\d]*$/)
        ]
      ],
      mensaje: ["", Validators.required],
      ciudad: ["", Validators.required],
      Tratamientos: ["", Validators.required]
    });

    /*    if (!this.tratamientogetter.value){
      this.formReg.controls.Tratamientos.setValue('Cual es tu puto tratamiento');
    }
 */
  }
  // fin ngoninit

  usuarioMetioDatos() {
    this.mensajitoFondo =
      "Tu formularío ha sido enviado con exito. Nos Comunicaremos con tigo lo antes posible. Un feliz día ...";
    this.loading = true;
    console.log(this.formReg.value);
    this.conecteServidor
      .EnviarDatos(this.formReg.value)
      .subscribe((data: DataModel) => {
        console.log("respuesta de servidor");
        console.log(data);
        this.loading = false;
        if (data) {
          if (data.success) {
            Swal.fire({
              title:
                "Felicitaciones " +
                this.nombregetter.value +
                " se ha enviado con exito tú formulario",
              animation: false,
              html: `<br><br> <img src="https://cdn.pixabay.com/photo/2018/04/12/04/21/snellen-3312498__480.png" width="180px" height="190px" />
              <p class="text-center animated bounce"> <b> Pronto nos comunicaremos con tigo  </b> </p> `,
              type: "success",
              customClass: "animated tada",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok!"
            }).then(result => {
              if (result.value) {
                // this.router.navigate(["/login"]);
              }
            });
            // fin swal
          }

          if (!data.success) {
            alert("sin exito");
          }
        }
        if (!data) {
          this.loading = true;
          Swal.fire({
            title: "Error en el Servidor :(",
            type: "error"
          });
          this.loading = false;
        }
      });
  }
}
