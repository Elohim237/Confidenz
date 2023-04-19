import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConfigDocComponent } from './config-doc/config-doc.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register', component: RegistrationComponent},
  {path:'homeadmin', component: HomeAdminComponent},
  {path:'documents', component: DocumentsComponent},
  {path:'configdoc', component: ConfigDocComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
