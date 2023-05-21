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
  celluleForm = new FormGroup({
    value: new FormControl(),
  });
  constructor(private route: ActivatedRoute,private router: Router) {}
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo");
    this.compagnInfo=JSON.parse(this.storeData);

    this.docData=localStorage.getItem("viewElement");
    this.elements=JSON.parse(this.docData);
    console.log(this.elements);
    console.log(this.employee);
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("le id",this.id)
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
          let result={'value':child.employee_id}
          this.colonnes[j][0] = result;
          console.log("colonne",this.colonnes[j][0])
        }
          this.colonnes[j][i+1] = child;  
      }
    }

  }
  updateFilteredData() {
    this.filteredData = this.colonnes.filter((item:any) => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  submitCellule(id:number){
    this.loader=true;
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
      console.log(response);
    }).catch((error)=>{
      this.loader=false;
      console.log(error)
      this.errormessage= error.response.data.message ?? error.response.data.error
      this.errorcode=true;
    })
   
  }
}

  // list(){
  //   let BearerToken= 'Bearer '+this.compagnInfo.authorization.token
  //     axios.get(URL.COMPAGNY_URL + '/'+this.compagnInfo.compagny.id+'/files/'+this.id,{
  //       headers:{
  //         'Authorization': BearerToken,
  //       }
  //     }).then((response)=>{
  //       console.log("response",response)
  //       this.loader=false;
  //       this.documents=response.data.content
  //       console.log(this.documents)
  //       localStorage.removeItem('viewElement');
  //       localStorage.setItem('viewElement',JSON.stringify(this.documents));
  //     }).catch((error)=>{
  //       this.loader=false
  //       console.log(error)
  //     })
  //   }
  

