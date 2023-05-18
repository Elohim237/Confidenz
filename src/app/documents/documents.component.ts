import { Component } from '@angular/core';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
    storeData:any;
    compagnInfo:any;
    ngOnInit(){
      this.storeData=localStorage.getItem("userInfo")
      this.compagnInfo=JSON.parse(this.storeData);
      
    }

}
