import { Component, OnInit } from "@angular/core";
import { ConeccionService } from "src/servicios/coneccion.service";
import { MenuItem, SelectItem } from "primeng/api";
import Swal from "sweetalert2";
import { Observable, of, Subject, timer, interval, Subscription, observable } from "rxjs";

import { NgFlashMessageService } from "ng-flash-messages";
import { Router } from '@angular/router';

interface LoqueLlega {
  success: boolean;
  msg: string;
  clientes: object;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  //modales bien chimbas
  selectedCustomer: any;
  nuevoCiego: boolean;
  clonObjetoCliente: any;
  displayDialog: boolean = false;
  detallesHeader="Detalles del cliente";
  //loader Elegante para que aparezca mientras se despierta el servidor recibe la petición
  // wuaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  loadingElegante: boolean;
  // Para eso se usan los booleanos true y false, true es corra animacion
  // False es apague animacion
 
  // 
  // wuaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  // toda la data de los clientes
  clientes: any;
  paginator: boolean;
  first = 0;
  filas: number;
  cols: any;
  meses: SelectItem[];
  headersTable: any=["nombre","telefono","tratamiento","date"];
  // asdijhsaudhsaudhsaudhas
  private subscription: Subscription;
  private subscription2: Subscription;
  sourceABC$ : Observable<number> = interval(2500);
  source: Observable<number> =  timer(1000);
  reset() {
    this.first = this.first + 1;
    if (this.first % 2 === 0) {
      this.paginator = false;
    } else {
      this.paginator = true;
    }
  }

  onRowSelect(Mievento){
    if (this.clonObjetoCliente){
      this.loadingElegante = false;

    }else {
      this.loadingElegante = true;


    }
    this.loadingElegante = false;

    this.nuevoCiego = true;
    this.clonObjetoCliente = this.clonePerrito(Mievento.data);
    const devuelva = timer(4500);
    devuelva.subscribe(x=>{
      this.detallesHeader = "Detalles del cliente";
    });
    console.log(`Objeto Cliente Clonado`);
    console.log(this.clonObjetoCliente);
    this.displayDialog=true;

  }

  clonePerrito(datosDeEvento){
    let objetoClon = {};
    // Iterando en los keys del objeto
    for (let keys in datosDeEvento){
      objetoClon[keys] = datosDeEvento[keys];
    }
    return objetoClon;
  }

  showDialogToAdd(){
    this.nuevoCiego= true;  
    this.clonObjetoCliente = {};
    this.displayDialog = true;
  }

  AgregarMeses(clientes) {
    clientes.map(objetos => {
      const meses = objetos.date.slice(5, 7);
      switch (meses) {
        case "01":
          objetos.mes = "enero";
          break;
        case "02":
          objetos.mes = "febrero";
          break;
        case "03":
          objetos.mes = "marzo";
          break;
        case "04":
          objetos.mes = "abril";
          break;
        case "05":
          objetos.mes = "mayo";
          break;
        case "06":
          objetos.mes = "junio";
          break;
        case "07":
          objetos.mes = "julio";
          break;
        case "08":
          objetos.mes = "agosto";
          break;
        case "09":
          objetos.mes = "septiembre";
          break;
        case "10":
          objetos.mes = "octubre";
          break;
        case "11":
          objetos.mes = "noviembre";
          break;
        case "12":
          objetos.mes = "diciembre";
          break;

        default:
      }
    });
  }

  constructor(
    private Com: ConeccionService,
    private flash: NgFlashMessageService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  ngOnInit() {
   
    this.loadingElegante=true;
    this.subscription2 =this.source.subscribe(val=> {
    this.loadingElegante = false;      
    });
    this.subscription = this.sourceABC$
    .subscribe(val=>{
      this.crisEinstein();
    });
 
    
    this.peticionClients();
    this.cols = [
      { field: "nombre", header: "Nombre" },
      { field: "telefono", header: "telefono" },
      { field: "tratamiento", header: "tratamiento" },
      { field: "mes", header: "date" }
      // { field: "correo", header: "Correo" },
      // { field: "mensaje", header: "Mensaje" },
      // { field: "ciudad", header: "ciudad" },
    ];

    this.meses = [
      { label: "enero", value: "enero" },
      { label: "febrero", value: "febrero" },
      { label: "marzo", value: "marzo" },
      { label: "abril", value: "abril" },
      { label: "mayo", value: "mayo" },
      { label: "junio", value: "junio" },
      { label: "julio", value: "julio" },
      { label: "agosto", value: "agosto" },
      { label: "septiembre", value: "septiembre" },
      { label: "octubre", value: "octubre" },
      { label: "noviembre", value: "noviembre" },
      { label: "diciembre", value: "diciembre" }
    ];
  }

  ngOnChanges(){
    console.log(`cambio`);
   

  }


  crisEinstein(){
    setTimeout(() => {
      this.Com.Irule().subscribe((data:any)=>{
        if (data.success){
          this.Com.logout();
          Swal.fire({
            imageHeight:300,
            imageUrl:'https://cdn.pixabay.com/photo/2016/08/18/09/21/expression-1602395__480.jpg',
            title:data.msg,
            imageWidth:300
          });
          this.router.navigate(['/home']);

        }else {
          console.log('autorizado');
        }
      })
    }, 2500);
  }

  peticionClients() {
    this.Com.ObtenerClientes().subscribe(
      (data: LoqueLlega) => {
        if (data) {
          if (data.success) {
            const source2 = timer(2000);
            source2.subscribe(a=>{
              this.loadingElegante = false
            });
            console.log(data);
            this.flash.showFlashMessage({
              messages: [data.msg],
              dismissible: true,
              timeout: false,
              type: "success"
            });
            // this.clientes = data.clientes;
            const clientes = data.clientes;
            this.AgregarMeses(clientes);
            this.clientes = clientes;
            console.log("Clientes ahora tienen propiedad meses");
            console.log(this.clientes);
          } else {
            this.loadingElegante = true;
            Swal.fire({
              title: "Error del backend",
              type: "error"
            });
            this.clientes = [];
            this.flash.showFlashMessage({
              messages: [data.msg],
              dismissible: true,
              timeout: false,
              type: "danger"
            });
          }
        } else {
          this.source.subscribe(val=> {
            this.loadingElegante = false;
            
          });
          Swal.fire({
            title: "Error del backend",
            type: "error"
          });
        }
      },
      error => {
        Swal.fire({
          title: "Error del backend",
          type: "error"
        });
        this.clientes = [];
      }
    );
  }

  salgase(evento){
    localStorage.clear();
    this.router.navigate(['/home']);
    
  }
}
