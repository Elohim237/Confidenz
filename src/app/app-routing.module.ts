import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConfigDocComponent } from './config-doc/config-doc.component';
import { DetailDocumentComponent } from './detail-document/detail-document.component';
import { ListeMembersComponent } from './liste-members/liste-members.component';
import { NotificationComponent } from './notification/notification.component';
import { ListeDocUserComponent } from './liste-doc-user/liste-doc-user.component';
import { ViewDocComponent } from './view-doc/view-doc.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ListeEmployeeComponent } from './liste-employee/liste-employee.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register', component: RegistrationComponent},
  {path:'homeadmin', component: HomeAdminComponent},
  {path:'documents', component: DocumentsComponent},
  {path:'configdoc', component: ConfigDocComponent},
  {path:'documents/detail', component: DetailDocumentComponent},
  {path:'documents/detail/liste', component: ListeMembersComponent},
  {path:'liste', component: ListeMembersComponent},
  {path:'notification', component: NotificationComponent},
  {path:'list-DocUser',component:ListeDocUserComponent},
  {path:'view-doc',component:ViewDocComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'list-employee',component:ListeEmployeeComponent},
  {path:'settings',component:SettingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
