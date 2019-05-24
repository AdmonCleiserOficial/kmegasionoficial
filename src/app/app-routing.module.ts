import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormularioComponent } from './formulario/formulario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TesteoComponent } from './testeo/testeo.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from 'src/servicios/auth.guard';
import { ProteccionComponent } from './proteccion/proteccion.component';
import { PostComponent } from './post/post.component';
import { TestimoniosComponent } from './testimonios/testimonios.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent, data: { state: "home" }},
  {path: "formulario", component: FormularioComponent},
  {path: "plataforma", component: DashboardComponent, data: { state: "login" },canActivate:[AuthGuard]},
  {path: "admin", component: AdminComponent, data: { state: "login" }},
  {path: "proteccion", component: ProteccionComponent, data: { state: "login" }},
  {path: "testimonios", component:TestimoniosComponent, data: { state: "login" }},
  {path: "post", component: PostComponent, data: { state: "login" },canActivate:[AuthGuard]},
  {path: "prueba", component: TesteoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
