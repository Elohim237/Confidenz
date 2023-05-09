import { Component } from '@angular/core';
import { CreateEmployeeService } from '../services/create-employee.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent {
  constructor(private createEmployservice: CreateEmployeeService){}
  upload=false;
  compagnInfo:any;
  storeData:any;
  selectedFile: File | undefined;
  nameFile:any;
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);

    console.log(this.compagnInfo);
  }
  createEmployeFile(event:any){ 
    this.selectedFile = event.target.files[0];
    // const file: File = event.target.files[0];
    // this.upload=true;
    // this.createEmployservice.createEmployeFile(this.compagnInfo,file);
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
}
