import { Component, OnInit } from '@angular/core';
import { CreateEmployeeService } from '../services/create-employee.service';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
axios.defaults.withCredentials=true;
import { Url } from '../classes/base-url';
import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';
axios.defaults.withCredentials=true;
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
 
  constructor(private createEmployservice: CreateEmployeeService,private formBuilder : FormBuilder,private router : Router){
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
  nameFile:any;
  create=false;
  loader=false;
  enregistreur="Enregistrer";
  contentError=false;
  isButtonDisabled: boolean = false;
  errors: Array<string>=[];
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo")
    this.userInfo=JSON.parse(this.storeData);
    this.compagnInfo=JSON.parse(this.storeData);

    console.log(this.userInfo);

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.upload=true;
    console.log(file);
    // Do something with the file (e.g. upload it to a server)
  }
  createEmployeFile(event:any){ 
    this.selectedFile = event.target.files[0];
  }
  uploadFile(event: any) {
    event.preventDefault();
    if (this.selectedFile) {
      let formdata = new FormData()
     formdata.append("employees",this.selectedFile);
     console.log(formdata);
      this.createEmployservice.createEmployeFile(this.compagnInfo,formdata);
    }
  }
   onSubmitUser(){
    let result={ name: this.CreateUser.value.name, email: this.CreateUser.value.email}
    console.log("valide");
    console.log(result);
    let BearerToken= 'Bearer '+this.compagnInfo.token
    this.loader=true;
    axios.post(Url.BASE_URL +'/api/v1/'+this.compagnInfo.compagny.id+'/employee/register',result,{
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
         this.enregistreur="Terminé close modal"
        //  this.isButtonDisabled = true;
      }
    }).catch((error)=>{
      if(error.response.status==401){
        this.create=false;
        this.loader=false;
        this.contentError=true;
        console.log(error);
        // this.errors.push(error.response.data)
        
      }
      
    })
  }
}
