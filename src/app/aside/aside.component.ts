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
  admin!: boolean;
  currentUrl !: string;
  storeData: any;
  userInfo: any;
  @Input("state") state = false;
  @Output('hideAside') hideAside = new EventEmitter<boolean>()
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log("Navigation End");
        this.currentUrl = event.url;
        // console.log("Current url: " + this.currentUrl);
      }
    })
  }
  ngOnInit() {
    this.storeData = sessionStorage.getItem("userInfo")
    this.userInfo = JSON.parse(this.storeData);
    this.admin = JSON.parse(sessionStorage.getItem("admin")!);
  }
  hideNavbar() {
    this.state = false
    this.hideAside.emit(this.state)
  }
  logOut() {
    axios.get(sessionStorage.getItem("url") + '/logout', {
      headers: {
        'Authorization': 'Bearer ' + this.userInfo.authorization.token,
      }
    }).then((response) => {
      // console.log(response)
      sessionStorage.clear()
      this.router.navigate(['/login'])
    }).catch((error) => {
      console.error(error)
    })
  }
}
