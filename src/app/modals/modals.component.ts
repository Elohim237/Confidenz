import { Component } from '@angular/core';
import { CreateEmployeeService } from '../services/create-employee.service';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { ConnexionForm } from '../classes/connexion-form';
import { AutServiceService } from '../services/aut-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent {
  CreateUser:FormGroup;
  constructor(private createEmployservice: CreateEmployeeService,private formBuilder : FormBuilder,private router : Router){
    this.CreateUser = this.formBuilder.group({
      name:['',Validators.required],
      email: ['',Validators.compose( [Validators.required, Validators.email])],
    });
  }
  upload=false;
  compagnInfo:any;
  storeData:any;
  selectedFile: File | undefined;
  nameFile:any;
  create=false;
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);

    console.log(this.compagnInfo);
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
     this.createEmployservice.CreateEmployeByForm(this.compagnInfo,result);
     this.create=this.createEmployservice.getCreate();
  }
}
