import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConfigDocComponent } from './config-doc/config-doc.component';
import { ListeMembersComponent } from './liste-members/liste-members.component';
import { NotificationComponent } from './notification/notification.component';
import { ViewDocComponent } from './view-doc/view-doc.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ListeEmployeeComponent } from './liste-employee/liste-employee.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', component: JSON.parse(sessionStorage.getItem('admin')!) ? HomeAdminComponent : DocumentsComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'configdoc', component: ConfigDocComponent },
  { path: 'detail/:id/liste', component: ListeMembersComponent },
  { path: 'documents/detail/:id', component: ViewDocComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'list-employee', component: ListeEmployeeComponent },
  { path: 'settings', component: SettingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
