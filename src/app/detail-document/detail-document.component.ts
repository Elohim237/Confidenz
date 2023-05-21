import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { URL } from '../classes/base-url';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.css']
})
export class DetailDocumentComponent  implements OnInit{
  storeData:any;
  compagnInfo:any;
  documents:Array<any>=[] ;
  docData:any;
  exceldoc:any;
  id:any;
  employee= new Set();
  loader:Boolean=true;
  constructor(private route: ActivatedRoute,private router:Router) {}
  ngOnInit(): void {
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);
    this.docData=localStorage.getItem("Doc");
    this.exceldoc=JSON.parse(this.docData);
    this.id = this.route.snapshot.paramMap.get('id');
   this.listdoc(this.id);
    
  }
  listdoc(id:any){
    let BearerToken= 'Bearer'+ this.compagnInfo.authorization.token 
      axios.get(URL.COMPAGNY_URL + '/'+this.compagnInfo.compagny.id+'/files/'+id,{
        headers:{
          'Authorization': BearerToken,
        }
      }).then((response)=>{
        console.log("response",response)
        this.loader=false;
        this.documents=response.data.content
        console.log(this.documents)
      }).catch((error)=>{
        this.loader=false
        console.log(error)
      })
    
  }
  viewElement(docs:any){
    localStorage.removeItem('viewElement');
      localStorage.setItem('viewElement',JSON.stringify(docs));
      // this.router.navigate(['/detail/',this.id,'liste'])
      this.router.navigate(['/detail/',this.id,'liste'])
  }
  
}
