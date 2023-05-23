import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { URL } from '../classes/base-url';
import { Router,NavigationExtras,NavigationStart,NavigationEnd } from '@angular/router';

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
  oneDoc=false;
  oneElement:any;
  headinglevel=true;
  heading!:number;
  counter!:number;
  count!: number;
  firstvisited:any;
  constructor(private route: ActivatedRoute,private router:Router) {
    this.route.queryParams.subscribe(params => {
      this.counter = params['heading'];
    });
    console.log("document constructor",this.documents);
    console.log(this.counter)
  }
  
  ngOnInit(): void {
    console.log("ngOnit",this.documents)
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);
    this.docData=localStorage.getItem("Doc");
    this.exceldoc=JSON.parse(this.docData);
    const storedCount = localStorage.getItem('count');
    this.id = this.route.snapshot.paramMap.get('id');
    this.firstvisited=localStorage.getItem("firstvisite");
    
  if (this.firstvisited == "firstvisite") {
    // Actions à effectuer lors de la première visite
    this.listdoc(this.id);
    if(storedCount == "1"){
      this.counter=1;
    }
    localStorage.setItem('firstvisite', 'visited')
  }
  else{
    console.log("seconde fois");
          let doc:any;
          this.loader=false;
          doc=localStorage.getItem('Documents');
          this.documents=JSON.parse(doc);
    if(this.counter==0){
      this.counter==this.counter; 
    }      
  }
   
    if (storedCount) {
      this.count = parseInt(storedCount, 10);
      this.count--;
 
    } else {
      this.count = this.exceldoc.heading_level; 
    }
    localStorage.setItem('count', this.count.toString()); 

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
        let myArray=[]
        myArray=response.data.content[0].children
        if (myArray.length === 0) {
        this.loader=false;
        this.oneDoc=true;
        console.log("seul");
        this.oneElement=response.data;
       }
       else{
       this.oneDoc=false;
       this.loader=false;
       this.documents=response.data.content;
       }
        console.log("le document",this.documents)
      }).catch((error)=>{
        this.loader=false
        console.log(error)
      })
    
  }
  viewElement(docs:any){
    console.log('docs',docs);
    localStorage.removeItem('viewElement');
      localStorage.setItem('viewElement',JSON.stringify(docs));
      this.router.navigate(['/detail/',this.id,'liste'])
  }
  return(documents:any){
    const currentUrl = this.router.url;
    localStorage.removeItem('Documents');
    localStorage.setItem('Documents',JSON.stringify(documents.children));
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate([currentUrl], { queryParams: { 
           heading:this.count} });
    });
  }
 
}
