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
  token !: string;
  storeData:any;
  compagnyInfo:any;
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
    this.storeData = localStorage.getItem("userInfo")
    this.compagnyInfo = JSON.parse(this.storeData);
    this.token= 'Bearer ' + this.compagnyInfo.authorization.token
  }

  logOut(){
    console.log("aside user info: ", this.compagnyInfo)
    // const BearerToken= 'Bearer ' + this.compagnyInfo.authorization.token
    console.log('Bearer Token: ', this.token)
    axios.post(URL.COMPAGNY_URL+'/logout', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin",
        'Authorization': this.token,
      }
    }).then((response) => {
      console.log(response)
      localStorage.removeItem("userInfo")
      // window.location.reload()
      this.router.navigate(['/'])
    }).catch((error) => {
      console.log(error)
    })
  }
}
