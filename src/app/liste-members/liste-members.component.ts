import { Component , ViewChild, TemplateRef, OnInit} from '@angular/core';
import axios from 'axios';
import { URL } from '../classes/base-url';
import { tick } from '@angular/core/testing';
import { error } from 'jquery';
@Component({
  selector: 'app-liste-members',
  templateUrl: './liste-members.component.html',
  styleUrls: ['./liste-members.component.css']
})
export class ListeMembersComponent implements OnInit {
  storeData:any;
  compagnInfo:any;
  elements:any;
  docData:any;
  children:Array<any>=[];
  member:any;
  memberData:any;
  result:any[]=[];
  entetes: string[] = [];
  colonnes: any[] = [];
  filteredData: any[] = [];
  searchText!: string;
  call:any[]=[];
  employee= new Set();
  arryEmployee:any[]=[]

  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);

    this.docData=localStorage.getItem("viewElement");
    this.elements=JSON.parse(this.docData);
    console.log(this.elements);
    console.log(this.employee)
    this.prepareDonnees()
   
  }
  
  prepareDonnees() {
    this.entetes.push("employés")
    for (let i = 0; i < this.elements.length; i++) {
      const item = this.elements[i];
      this.entetes.push(item.value);
      console.log("entete",this.entetes)
      for (let j = 0; j < item.children.length; j++) {
        const child = item.children[j];
        console.log('child',child)
        if (!this.colonnes[j]) {
          this.colonnes[j] = [];
        }
        if(i===0){
         
          this.colonnes[j][0] = child.employee_id;
          console.log("colonne",this.colonnes[j][0])
        }
          this.colonnes[j][i+1] = child.value;  
      }
    }

  }
  updateFilteredData() {
    this.filteredData = this.colonnes.filter((item:any) => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  
}
