import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import axios from 'axios';
import { URL } from '../classes/base-url';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})

export class AsideComponent implements OnInit{
  currentUrl !: string;
  storeData:any;
  compagnInfo:any;
  constructor(private router:Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        console.log("Navigation End");
        this.currentUrl=event.url;
        console.log(this.currentUrl);
      }
    })
  }
  ngOnInit() {
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);
  }
  logOut(){
    console.log("aside",this.compagnInfo)
    let BearerToken= 'Bearer '+this.compagnInfo.authorization.token
    console.log('le bearer',BearerToken)
    axios.post(URL.COMPAGNY_URL+'/logout',{
      headers: {
        'Authorization': BearerToken,
      } 
    }).then((response)=>{
      console.log(response)
      // localStorage.removeItem("userInfo")
      console.log(response)
    }).catch((error)=>{
      console.log(error);
    })

  }
}
