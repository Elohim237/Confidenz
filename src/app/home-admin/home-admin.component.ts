import { Component, OnInit } from '@angular/core';
import { CreateEmployeeService } from '../services/create-employee.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { URL } from '../classes/base-url';
import { ExcelConfigurationService } from '../services/excel-configuration.service';
axios.defaults.withCredentials = true;
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private createEmployservice: CreateEmployeeService, private formBuilder: FormBuilder, private router: Router, private excelService: ExcelConfigurationService) {
    this.CreateUser = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }
  upload = false;
  userInfo: any;
  storeData: any;
  CreateUser: FormGroup;
  compagnyInfo: any;
  selectedFile: File | undefined;
  excelFile: File | undefined;
  nameFile: any;
  create = false;
  loader = false;
  createFile = false;
  enregistreur = "Enregistrer";
  contentError = false;
  contentErrorPrint = false;
  isButtonDisabled: boolean = false;
  errors: Array<string> = [];
  errorPrint: any;
  ShowNavbar=false;
  ngOnInit() {
    if (!localStorage.getItem("userInfo")) {
      this.router.navigate(['/login']);
    }
    this.storeData = localStorage.getItem("userInfo")
    this.compagnyInfo = JSON.parse(this.storeData);
    console.log("compagnyInfo", this.compagnyInfo);
  }

  onFileSelected(event: any) {
    this.excelFile = event.target.files[0];
  }

  nextEtape(event: any) {
    event.preventDefault();
    if (this.excelFile) {
      this.excelService.setExcel(this.excelFile);
      this.router.navigate(['/configdoc'])
    }
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
          'Authorization': 'Bearer ' + this.compagnyInfo.authorization.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        console.log("reussi")
        this.loader = false;
        this.createFile = true;
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
        'Authorization': 'Bearer ' + this.compagnyInfo.authorization.token,
        'Content-Type': 'multipart/form-data'
      }

    }).then((response) => {
      console.log(response)
      this.create = true;
      console.log(this.create)
      this.loader = false;
    }).catch((error) => {
      this.create = false;
      this.loader = false;
      this.contentError = true;
      console.error(error);

    })
  }
}
