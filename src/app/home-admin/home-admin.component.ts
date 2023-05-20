import { Component, OnInit } from '@angular/core';
import { CreateEmployeeService } from '../services/create-employee.service';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
axios.defaults.withCredentials=true;
import { Url } from '../classes/base-url';
import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';
import { ExcelConfigurationService } from '../services/excel-configuration.service';
axios.defaults.withCredentials=true;
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
 
  constructor(private createEmployservice: CreateEmployeeService,private formBuilder : FormBuilder,private router : Router,private excelService: ExcelConfigurationService ){
    this.CreateUser = this.formBuilder.group({
      name:['',Validators.required],
      email: ['',Validators.compose( [Validators.required, Validators.email])],
    });
  }
  upload=false;
  userInfo:any;
  storeData:any;
  CreateUser:FormGroup;
  compagnInfo:any;
  selectedFile: File | undefined;
  excelFile: File | undefined;
  nameFile:any;
  create=false;
  loader=false;
  createFile=false;
  enregistreur="Enregistrer";
  contentError=false;
  contentErrorPrint=false;
  isButtonDisabled: boolean = false;
  errors: Array<string>=[];
  errorPrint:any;
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);
    console.log("compagnInfo",this.compagnInfo);

  }

  onFileSelected(event: any) {
    this.excelFile= event.target.files[0];
  }

  nextEtape(event:any){
    event.preventDefault();
    if (this.excelFile){
    this.excelService.setExcel(this.excelFile);
    this.router.navigate(['/configdoc'])
    }
  }

  createEmployeFile(event:any){ 
    this.selectedFile = event.target.files[0];
  }
  async uploadFile(event: any) {
    event.preventDefault();
    if (this.selectedFile) {
      let formdata = new FormData()
     formdata.append("employees",this.selectedFile);
     console.log(formdata);
     this.loader=true;
     let BearerToken= 'Bearer '+this.compagnInfo.authorization.token
      
    await axios.post(Url.COMPAGNY_URL + '/'+this.compagnInfo.compagny.id+'/upload/employees',formdata,{
      withCredentials: true,
      headers: {
        'Authorization': BearerToken,
        'Content-Type': 'multipart/form-data'
      } 
    }).then(()=>{
      console.log("reussi")
      this.loader=false;
      this.createFile=true;
    })
    .catch((erreur)=>{
      console.log(erreur)
      if(erreur.response.status===400){
        this.contentErrorPrint=true
        this.errorPrint=erreur.response.data.error
      }
      this.loader=false;
    })
  }
    }

   onSubmitUser(){
    let result={ name: this.CreateUser.value.name, email: this.CreateUser.value.email}
    console.log("valide");
    console.log(result);
    let BearerToken= 'Bearer '+this.compagnInfo.authorization.token
    this.loader=true;
    axios.post(Url.COMPAGNY_URL +'/'+this.compagnInfo.compagny.id+'/employees/register',result,{
      withCredentials: true,
      headers: {
        'Authorization': BearerToken,
        'Content-Type': 'multipart/form-data'
      }
      
    }).then((response)=>{
      console.log(response)
      if(response.status==201){
         this.create=true;
         console.log(this.create)
         this.loader=false;
      }
    }).catch((error)=>{
      if(error.response.status==401){
        this.create=false;
        this.loader=false;
        this.contentError=true;
        console.log(error);
      }
      
    })
  }
}
