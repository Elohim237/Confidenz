import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import axios from 'axios';
import { URL } from '../classes/base-url';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})

export class AsideComponent implements OnInit {
  currentUrl !: string;
  token !: string;
  storeData: any;
  compagnyInfo: any;
  @Input("state") state= false;
  @Output('hideAside')hideAside= new EventEmitter<boolean>()
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("Navigation End");
        this.currentUrl = event.url;
        console.log(this.currentUrl);
      }
    })
  }
  ngOnInit() {
    this.storeData = localStorage.getItem("userInfo")
    this.compagnyInfo = JSON.parse(this.storeData);
    this.token = 'Bearer ' + this.compagnyInfo.authorization.token
  }
  hideNavbar(){
    this.state = false
    this.hideAside.emit(this.state)
  }
  logOut() {
    console.log("aside user info: ", this.compagnyInfo)
    console.log('Bearer Token: ', this.token)
    axios.get(URL.COMPAGNY_URL + '/logout', {
      headers: {
        'Authorization': this.token,
      }
    }).then((response) => {
      console.log(response)
      localStorage.clear()
      this.router.navigate(['/login'])
    }).catch((error) => {
      console.log(error)
    })
  }
}
