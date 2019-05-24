import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgFlashMessagesModule } from "ng-flash-messages";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from "primeng/table";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { SliderModule } from "primeng/slider";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { CheckboxModule } from "primeng/checkbox";
import { NgxLoadingModule } from "ngx-loading";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule
} from "@angular/material";
import { FormularioComponent } from './formulario/formulario.component';
import { DialogModule } from 'primeng/dialog';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TesteoComponent } from './testeo/testeo.component';
import { AdminComponent } from './admin/admin.component';
import { ProteccionComponent } from './proteccion/proteccion.component';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { SafePipe } from 'src/pipes/seguro';
import { TestimoniosComponent } from './testimonios/testimonios.component';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';


@NgModule({
  declarations: [AppComponent, FormularioComponent, DashboardComponent, HomeComponent, TesteoComponent, AdminComponent, ProteccionComponent, PostComponent, HeaderComponent, SafePipe, TestimoniosComponent],
  imports: [
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'just-me' } as CloudinaryConfiguration),
    BrowserModule,
    AppRoutingModule,
    
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    TableModule,
    DataTableModule,
    MatInputModule,
    SliderModule,
    MultiSelectModule,
    CheckboxModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    DropdownModule,
    MatOptionModule,
    MatSelectModule,
    DialogModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgFlashMessagesModule
  ],
  entryComponents: [
    FormularioComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
