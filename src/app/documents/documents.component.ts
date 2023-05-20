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
    currentPage = 1;
    filteredData: any[] = [];
    searchText!: string;
    actionDelete=false;

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
      let BearerToken= 'Bearer'+ this.compagnInfo.authorization.token 
      axios.get(Url.COMPAGNY_URL + '/'+this.compagnInfo.compagny.id+'/files',{
        headers:{
          'Authorization': BearerToken,
        }
      }).then((response)=>{
        if(response.data.files)
        this.docs=response.data.files;
        this.filteredData=response.data.files;
        console.log(this.docs)
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
    }
    updateFilteredData() {
      // Appliquer le filtre sur les données en utilisant comme critere le nom du Docs
      this.filteredData = this.docs.filter((item:any) => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    deletedDoc(idDoc:any){
      let BearerToken= 'Bearer'+ this.compagnInfo.authorization.token;
      this.actionDelete=true;
      axios.delete(Url.COMPAGNY_URL + '/'+this.compagnInfo.compagny.id+'/files/'+idDoc+'/delete',{
        headers: {
          'Authorization': BearerToken
        }
      }).then((response)=>{
        this.actionDelete=false;
        console.log(response)
        window.location.reload()
      }).catch((error)=>{
        this.actionDelete=false;
        console.log(error)
      })
    }
}
