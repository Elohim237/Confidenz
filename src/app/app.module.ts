import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideComponent } from './aside/aside.component';
import { DocumentsComponent } from './documents/documents.component';
import { JsComponent } from './js/js.component';
import { ConfigDocComponent } from './config-doc/config-doc.component';
import { NotificationComponent } from './notification/notification.component';
import { DetailDocumentComponent } from './detail-document/detail-document.component';
import { ListeMembersComponent } from './liste-members/liste-members.component';
import { ModalsComponent } from './modals/modals.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { ListeDocUserComponent } from './liste-doc-user/liste-doc-user.component';
import { ViewDocComponent } from './view-doc/view-doc.component';
import { BarProgressComponent } from './bar-progress/bar-progress.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { ListeEmployeeComponent } from './liste-employee/liste-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeAdminComponent,
    NavbarComponent,
    AsideComponent,
    DocumentsComponent,
    JsComponent,
    ConfigDocComponent,
    NotificationComponent,
    DetailDocumentComponent,
    ListeMembersComponent,
    ModalsComponent,
    ListeDocUserComponent,
    ViewDocComponent,
    BarProgressComponent,
    ForgetPasswordComponent,
    LoginEmployeeComponent,
    ListeEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
