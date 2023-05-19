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
      let BearerToken= 'Bearer '+this.compagnInfo.token
      axios.get(Url.COMPAGNY_URL + '/'+this.compagnInfo.compagny.id+'/files',{
        withCredentials: true,
        headers: {
          'Authorization': BearerToken,
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
        this.docs=response.data.files;
        console.log(this.docs)
        console.log(response)
      })
    }
}
