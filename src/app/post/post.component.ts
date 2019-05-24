import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ConeccionService } from 'src/servicios/coneccion.service';

interface Server {
  success: boolean;
  msg : string;
  foto : {
    id: string;
    url: string;
  }
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  selectedFile;
  titulo: string;
  imagen: string;
  articulo: string;
  video: string;
  idFoto: string;
  booleanos: boolean = false;
  validador: string;
  loading: boolean = false;
  onFileSelected(imageInput: any) {
    const file: File = imageInput.files[0];
    this.selectedFile = file;
    console.log(`Imprime el nombre del archivo`);
    console.log(file.name);
    this.validador = file.name; 
    console.log(`Que carajos estoy enviandoooooooooooooooooooooooo?`);
    console.log(`Que carajos estoy enviandoooooooooooooooooooooooo?`);
    console.log(`Que carajos estoy enviandoooooooooooooooooooooooo?`);
    console.log(this.selectedFile);   
    // cancelando peticion a la base de datos
    this.conecte.enviarMedia(this.selectedFile)
    .subscribe((data: Server)=>{
      if (data){
        if  (data.success){
          this.validador = data.msg;
          this.idFoto = data.foto.id;
          console.log( 'me llego el id del servidor?' );
          console.log( 'me llego el id del servidor?' );
          console.log( 'me llego el id del servidor?' );
          console.log( 'me llego el id del servidor?' );
          console.log( 'me llego el id del servidor?' );
          console.log( 'me llego el id del servidor?' );
          console.log( 'me llego el id del servidor?' );
          console.log( data.foto.id );
          this.booleanos=true;
        }
      }else{
        this.validador='error en la base de datos'
      }
    })
  }
  usuarioMetioDatos() {  
    Swal.fire({
      title: 'Estas seguro/a que vas a subir este post?',
      animation: false,
      customClass: {
        popup: 'animated tada'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, estoy De Acuerdo!',
      cancelButtonText: 'No, aun necesito editar mas!',
    }).then(x=>{
      const objetoEnviar = {
        titulo: this.titulo,
        imagen:this.imagen,
        video: this.video,
        articulo: this.articulo,
  
      }
      //@desc Enviando todo el modelo blog al servidor
      if (x){
        this.loading=true;        
        this.conecte.enviePostBlog(objetoEnviar)
        .subscribe((data:any)=>{
          if (data){
            if (data.success){
              this.loading = false;
              Swal.fire(
                'Post Enviado',
                'Tus clientes veran tu pubblicacion en la pestaña posts',
                'success')
            } else{
              this.loading = false;
              Swal.fire(
                'Post ha fallado',
                'server problems',
                'error')
            }
          }else{
            this.loading = false;
            Swal.fire(
              'Post ha fallado',
              'No hay coneccion con el servidor',
              'error')
          }
        })
      }else{
        this.loading = false;
        Swal.fire(
          'OK',
          'corrige bien tus problemas antes de darle enviar',
          'success')

      }
    });
  }


  constructor(
    private conecte: ConeccionService
  ) { }

  ngOnInit() {
  }

}
