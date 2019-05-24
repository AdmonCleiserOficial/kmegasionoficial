import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { FormularioComponent } from '../formulario/formulario.component';
// import * from 'jquery';
// import * as $ from "jquery";
declare var jQuery:any;
declare var $:any;
// declare const
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private overlay: Overlay) { }

  openDialog(): void {

    $('.navbar-toggler').click(); 

    const dialogRef = this.dialog.open(FormularioComponent,{

      width: '500px',
      maxHeight: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  ngOnInit() {
   
  }

}
