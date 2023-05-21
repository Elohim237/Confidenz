import { Component , ViewChild, TemplateRef, OnInit} from '@angular/core';
import { ListeEmployeeService } from '../services/liste-employee.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import axios from 'axios';
import { URL } from '../classes/base-url';
import * as $ from 'jquery';
import 'bootstrap-table';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-liste-employee',
  templateUrl: './liste-employee.component.html',
  styleUrls: ['./liste-employee.component.css']
})


export class ListeEmployeeComponent implements OnInit{
  storeData:any;
  compagnInfo:any;
  employees:Array<any>=[];
  subscription!: Subscription; 
  tableOptions:any;
  deleted=false;
  BearerToken!:string;
  actionDelete=false;
  searchText!: string;
  filteredData: any[] = [];
  currentPage = 1;
  
  constructor(private listeEmployeService: ListeEmployeeService){}
  
  //dataa:Array<any>=[];
  ngOnInit(){

    //this.dataa.push(this.employees);
    // this.data=this.employees;
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);
    console.log(this.compagnInfo);
    this.BearerToken= 'Bearer '+this.compagnInfo.authorization.token;

    this.getlisteEmploye(this.compagnInfo);
    
}


getlisteEmploye(compagnies:any){
   console.log("yo",compagnies)
    axios.get(URL.COMPAGNY_URL+ '/'+compagnies.compagny.id+'/employees',{
            withCredentials: true,
            headers: {
              'Authorization': this.BearerToken
            }
  }).then((response)=>{

    console.log("reponse",response);
    this.employees=response.data.employees;
    this.filteredData=response.data.employees;
    localStorage.removeItem('employees');
    localStorage.setItem('employees',JSON.stringify(this.employees));

  }).catch((error)=>{
    console.log(error)
  })
  
}
  deletedEmployee(idEmployee:any){
    this.actionDelete=true;
      axios.delete(URL.COMPAGNY_URL+'/'+this.compagnInfo.compagny.id+'/employees/'+idEmployee,{
        withCredentials: true,
        headers: {
          'Authorization': this.BearerToken
        }
      }).then((response)=>{
        console.log(response);
        window.location.reload()
        this.deleted=true
      })
  }
  updateFilteredData() {
    // Appliquer le filtre sur les données en utilisant comme critere le name de l'employé
    this.filteredData = this.employees.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
   
  }
 
}
