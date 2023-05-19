import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExcelConfigurationService {
  excelDoc:any;
  messageSucced:any;
  constructor() { }

  setExcel(file:any){
    this.excelDoc=file;
  }
  getExcel(){
    return this.excelDoc;
  }

  setSuccedExcel(message:any){
    this.messageSucced=message;
  }
   
  getmessageSuccedExcel(){
    return this.messageSucced
  }

}
