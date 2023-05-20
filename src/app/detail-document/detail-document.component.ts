import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { URL } from '../classes/base-url';
@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.css']
})
export class DetailDocumentComponent  implements OnInit{
  storeData:any;
  compagnInfo:any;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);
    const id = this.route.snapshot.paramMap.get('id');
   
  }
  listdoc(id:any){
    let BearerToken= 'Bearer'+ this.compagnInfo.authorization.token 
      axios.get(URL.COMPAGNY_URL + '/'+this.compagnInfo.compagny.id+'/files/'+id,{
        headers:{
          'Authorization': BearerToken,
        }
      }).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
    
  }
}
