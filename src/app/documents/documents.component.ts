import { Component } from '@angular/core';
import axios from 'axios';
import { Url } from '../classes/base-url';
import { ExcelConfigurationService } from '../services/excel-configuration.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

export class DocumentsComponent {
    storeData:any;
    compagnInfo:any;
    docs:any;
    messageSucced!:string;
    count=false;
    constructor(private excelService:ExcelConfigurationService){}
    ngOnInit(){
      this.storeData=localStorage.getItem("userInfo")
      this.compagnInfo=JSON.parse(this.storeData);
      console.log(this.compagnInfo)
      this.listDocCompagnies();
      this.messageSucced=this.excelService.getmessageSuccedExcel();
      if(this.messageSucced != undefined){
        this.count=true;
      }
      console.log("message",this.excelService.getmessageSuccedExcel());
    }

    listDocCompagnies(){
      
      // let BearerToken= 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL2NvbXBhZ25pZXMvcmVmcmVzaCIsImlhdCI6MTY4NDU2OTg4MCwiZXhwIjoxNjg0NTc1NzIzLCJuYmYiOjE2ODQ1NzIxMjMsImp0aSI6IlVqclhueTR2d1J2aEZPTWciLCJzdWIiOiIxIiwicHJ2IjoiY2RiODE3NWM0N2ZkMzM3NjQzYzI2ZWFkOTc2MDkwN2ZkM2Q5ZmVkMSJ9.PG5734PdG30j81yIC5gyXhbhri6d2RqImLQtkS8MQqg'
      let BearerToken= 'Bearer'+ this.compagnInfo.authorization.token 
      axios.get(Url.COMPAGNY_URL + '/'+this.compagnInfo.compagny.id+'/files',{
        headers:{
          'Authorization': BearerToken,
        }
      }).then((response)=>{
        if(response.data.files)
        this.docs=response.data.files;
        console.log(this.docs)
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
    }
}
