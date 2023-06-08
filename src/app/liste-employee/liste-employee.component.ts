import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ListeEmployeeService } from '../services/liste-employee.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import axios from 'axios';
import { URL } from '../classes/base-url';
import * as $ from 'jquery';
import 'bootstrap-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-liste-employee',
  templateUrl: './liste-employee.component.html',
  styleUrls: ['./liste-employee.component.css']
})


export class ListeEmployeeComponent implements OnInit {
  BearerToken = "";
  storeData: any;
  compagnyInfo: any;
  employees: Array<any> = [];
  subscription!: Subscription;
  tableOptions: any;
  deleted = false;
  actionDelete = false;
  searchText!: string;
  filteredData: any[] = [];
  currentPage = 1;
  loaderpage = true;
  errormessage: any;
  errorload = false;
  docData: any;
  docInfo: any;
  modify: Boolean = false;
  create = false;
  loader = false;
  createFile = false;
  enregistreur = "Enregistrer";
  contentError = false;
  contentErrorPrint = false;
  CreateUser: FormGroup;
  errorPrint: any;
  selectedFile: File | undefined;
  ShowNavbar = false;
  constructor(private listeEmployeService: ListeEmployeeService, private formBuilder: FormBuilder) {
    this.BearerToken = 'Bearer ' + this.compagnyInfo.authorization.token
    this.CreateUser = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() {
    this.storeData = localStorage.getItem("userInfo")
    this.compagnyInfo = JSON.parse(this.storeData);

    this.docData = localStorage.getItem("Doc")
    this.docInfo = JSON.parse(this.docData);

    this.getlisteEmploye(this.compagnyInfo);
  }


  getlisteEmploye(compagnies: any) {
    axios.get(URL.COMPAGNY_URL + '/employees', {
      withCredentials: true,
      headers: {
        'Authorization': this.BearerToken
      }
    }).then((response) => {
      console.log("reponse", response);
      this.employees = response.data.employees;
      this.filteredData = response.data.employees;
      localStorage.removeItem('employees');
      localStorage.setItem('employees', JSON.stringify(this.employees));
      this.loaderpage = false;
    }).catch((error) => {
      console.error(error);
      this.loaderpage = false;
      this.errorload = true;
      this.errormessage = error.response.data.message ?? error.response.data.error
    })

  }
  deletedEmployee(idEmployee: any) {
    this.actionDelete = true;
    axios.delete(URL.COMPAGNY_URL + '/employees/' + idEmployee, {
      withCredentials: true,
      headers: {
        'Authorization': this.BearerToken
      }
    }).then((response) => {
      console.log(response);
      window.location.reload()
      this.deleted = true
    })
  }
  updateFilteredData() {
    // Appliquer le filtre sur les données en utilisant comme critere le name de l'employé
    this.filteredData = this.employees.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));

  }
  createEmployeFile(event: any) {
    this.selectedFile = event.target.files[0];
  }
  async uploadFile(event: any) {
    event.preventDefault();
    if (this.selectedFile) {
      let formdata = new FormData()
      formdata.append("employees", this.selectedFile);
      console.log(formdata);
      this.loader = true;

      await axios.post(URL.COMPAGNY_URL + '/upload/employees', formdata, {
        withCredentials: true,
        headers: {
          'Authorization': this.BearerToken,
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        console.log("reussi")
        this.loader = false;
        this.createFile = true;
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      })
        .catch((erreur) => {
          console.log(erreur)

          this.contentErrorPrint = true
          this.errorPrint = erreur.response.data.message ?? erreur.response.data.error
          this.loader = false;
        })
    }
  }
  onSubmitUser() {
    let result = { name: this.CreateUser.value.name, email: this.CreateUser.value.email }
    console.log("valide");
    console.log(result);
    this.loader = true;
    axios.post(URL.COMPAGNY_URL + '/employees/register', result, {
      withCredentials: true,
      headers: {
        'Authorization': this.BearerToken,
        'Content-Type': 'multipart/form-data'
      }

    }).then((response) => {
      console.log(response)
      this.create = true;
      console.log(this.create)
      this.loader = false;
      setTimeout(() => {
        window.location.reload()
      }, 1000);

    }).catch((error) => {
      this.create = false;
      this.loader = false;
      this.contentError = true;
      console.error(error);
    })
  }
}
