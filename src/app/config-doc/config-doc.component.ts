import { Component, OnInit } from '@angular/core';
import { ExcelConfigurationService } from '../services/excel-configuration.service';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import axios from 'axios';
import { Url } from '../classes/base-url';
import { Router } from '@angular/router';
@Component({
  selector: 'app-config-doc',
  templateUrl: './config-doc.component.html',
  styleUrls: ['./config-doc.component.css']
})
export class ConfigDocComponent implements OnInit {
  width="50%"
  storeData:any
  compagnInfo:any
  file:File |undefined
  excelForm = new FormGroup({
    NomFichier: new FormControl(),
    Droit:  new FormControl(),
    Niveau:   new FormControl(),
  });
  errorExcel=false;
  loader=false;
  errorMessage!:string;
  stape="1/2"
  constructor(private excelDoc:ExcelConfigurationService,private router:Router, private excelService: ExcelConfigurationService ){}

  ngOnInit(){
    this.excelDoc.getExcel();
    console.log( this.excelDoc.getExcel());
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);
    
  }
  submitExcel(){
    let BearerToken= 'Bearer '+this.compagnInfo.authorization.token
    let formdata=new FormData()
    formdata.append('excel',this.excelDoc.getExcel())
    formdata.append('name',this.excelForm.value.NomFichier)
    formdata.append('heading_level',this.excelForm.value.Niveau)
    formdata.append('rights',this.excelForm.value.Droit)
    this.loader=true;

    axios.post(Url.COMPAGNY_URL + '/'+this.compagnInfo.compagny.id+'/upload/excel',formdata, {
      withCredentials: true,
      headers: {
        'Authorization': BearerToken,
        'Content-Type': 'multipart/form-data'
      } 
    }).then((response:any)=>{
      this.loader=false;
      this.stape="2/2"
      this.width="100%"
      this.excelService.setSuccedExcel(response.data.message)
      setTimeout(() => {
        this.router.navigate(['/documents'])
      }, 1000);
      console.log(response.data.message)
    }).catch((error:any)=>{
      console.log(error);
      this.errorMessage=error.response.data.error
      this.loader=false;
      this.errorExcel=true
    })
  }
}
