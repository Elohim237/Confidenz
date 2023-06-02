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
import { ConfigDocComponent } from './config-doc/config-doc.component';
import { NotificationComponent } from './notification/notification.component';
import { ListeMembersComponent } from './liste-members/liste-members.component';
import { ModalsComponent } from './modals/modals.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ViewDocComponent } from './view-doc/view-doc.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ListeEmployeeComponent } from './liste-employee/liste-employee.component';
import { SettingComponent } from './setting/setting.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeAdminComponent,
    NavbarComponent,
    AsideComponent,
    DocumentsComponent,
    ConfigDocComponent,
    NotificationComponent,
    ModalsComponent,
    ViewDocComponent,
    ForgetPasswordComponent,
    ListeEmployeeComponent,
    SettingComponent,
    ListeMembersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
