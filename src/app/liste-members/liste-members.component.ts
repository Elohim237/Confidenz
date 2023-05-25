import { Component , ViewChild, TemplateRef, OnInit} from '@angular/core';
import axios from 'axios';
import { URL } from '../classes/base-url';
import { FormGroup ,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  loader:Boolean=false;
  succedmessage!:string;
  errormessage!:string;
  errorcode:Boolean=false;
  succedcode:Boolean=false;
  documents:any;
  id!:any;
  listemployee:any[]=[];
  modify=false;
  modification:any;
  colonneafter: any[] = [];
  celluleForm = new FormGroup({
    value: new FormControl(),
  });
  child:any;
  entete:any;
  visited:Boolean=false;
  constructor(private route: ActivatedRoute,private router: Router) {}
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo");
    this.compagnInfo=JSON.parse(this.storeData);
    this.docData=localStorage.getItem("viewElement");
    
    this.elements=JSON.parse(this.docData);
    console.log("element",this.elements)

    console.log(this.employee);
    this.id = this.route.snapshot.paramMap.get('id');
    let edit:any;
    edit=localStorage.getItem('Doc');
    this.modification=JSON.parse(edit);
    console.log("modif",this.modification)
    if (this.modification.rights === "Modifiable"){
      this.modify=true;
    }
    console.log("le id",this.id)
    let firstvisite;
    firstvisite=localStorage.getItem("firstvisiteview");
    if(firstvisite=="firstvisite" && this.visited==false){
      this.prepareDonnees() 
      localStorage.setItem('firstvisiteview', 'visited'); 
    }
    else{
      console.log("second visite");
      this.prepareDonnees2() 
      this.visited=true;
    }
   
  }
  
  prepareDonnees() {
    console.log('prepare',this.elements)
    this.entetes.push("employés") 
    console.log("yo");
      const item=this.elements;
      this.entete=item.value;
      this.entetes.push(item.value)
      for (let j = 0; j < item.children.length; j++){
          this.child =item.children[j];
          let result={'value':this.child.employee_id,'name':true,'position':j}
          console.log("le result",result)
            if (!this.colonnes[j]) {
              this.colonnes[j] = [];
            }
            
            this.colonnes[j][0]=result;
            this.colonnes[j][1]=this.child;   
            console.log("this.colonne",this.colonnes)
          
          }       
        }
          
prepareDonnees2(){
  console.log('prepare',this.elements)
  this.entetes.push("employés") 
  console.log("yo");
  const item=this.elements;
  console.log("item",item)
  let Encour:any;
  Encour=localStorage.getItem("Encour")
  this.entetes.push(Encour)
  for (let j = 0; j < item.length; j++){
    this.child =item[j];
    console.log("le childer",item[j].value)
    let result={'value':this.child.employee_id,'name':true,'position':j}
    console.log("le result",result)
    if (!this.colonnes[j]) {
      this.colonnes[j] = [];
    }
    this.colonnes[j][0]=result;
    this.colonnes[j][1]=this.child
  }
  }
 
  updateFilteredData() {
    this.filteredData = this.colonnes.filter((item:any) => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  submitCellule(id:number,position:number){
    this.loader=true;
    console.log("le id",id)
    console.log("le position",position)
    let BearerToken= 'Bearer '+this.compagnInfo.authorization.token
    let formdata=new FormData()
    formdata.append('value',this.celluleForm.value.value)
    axios.post(URL.ALL_URL+'/cells/'+id+'/update', formdata,{
      headers: {
        'Authorization': BearerToken
      }
    }).then((response)=>{
      this.loader=false;
      this.succedmessage=response.data.message;
      this.succedcode=true;
      const item=this.elements;
      this.entetes.push(item.value)
      for (let j = 0; j < item.children.length; j++){
        const child =item.children[j];
        let result={'value':child.employee_id,'name':true,'position':j}
        console.log("le result",result)
          if(j==position){
            console.log("tu es dendans")
            this.colonnes[j][1].value=formdata.get('value');
          }
          else{
            this.colonnes[j][1]=child
          }
        }
        console.log("prepre colonne",this.colonnes)
        this.colonnes= this.colonnes.map((sousTableau) => sousTableau.slice(1))
        this.colonnes= this.colonnes.flat();
        localStorage.removeItem("Encour")
        localStorage.setItem("Encour",this.elements.value)
        localStorage.removeItem("viewElement")
        localStorage.setItem("viewElement",JSON.stringify(this.colonnes))
        window.location.reload()
        console.log(response);
    }).catch((error)=>{
      console.log(error)
      this.loader=false;
      this.errormessage= error.response.data.message ?? error.response.data.error
      this.errorcode=true;
    })
   
  }

  submitCellule2(id:number,position:number){
    this.loader=true;
    console.log("le id",id)
    console.log("le position",position)
    let BearerToken= 'Bearer '+this.compagnInfo.authorization.token
    let formdata=new FormData()
    formdata.append('value',this.celluleForm.value.value)
    axios.post(URL.ALL_URL+'/cells/'+id+'/update', formdata,{
      headers: {
        'Authorization': BearerToken
      }
    }).then((response)=>{ 
      this.loader=false;
      this.succedmessage=response.data.message;
      this.succedcode=true;
      const item=this.elements;
      this.entetes.push(item.value)
      for (let j = 0; j < item.length; j++){
        this.child =item[j];
        let result={'value':  this.child.employee_id,'name':true,'position':j}
        console.log("le result",result)
          if(j==position){
            console.log("tu es dendans")
            this.colonnes[j][1].value=formdata.get('value');
          }
          else{
            this.colonnes[j][1]=  this.child
          }
        }
        console.log("prepre colonne",this.colonnes)
        this.colonnes= this.colonnes.map((sousTableau) => sousTableau.slice(1))
        this.colonnes= this.colonnes.flat();
        localStorage.removeItem("viewElement")
        localStorage.setItem("viewElement",JSON.stringify(this.colonnes))
        window.location.reload()
        console.log(response);
    }).catch((error)=>{
      console.log(error)
      this.loader=false;
      this.errormessage= error.response.data.message ?? error.response.data.error
      this.errorcode=true;
    })
   
  }
}


