import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { URL } from '../classes/base-url';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  admin: boolean = JSON.parse(sessionStorage.getItem('admin')!);
  upload = false;
  userInfo: any;
  storeData: any;
  token!: string;
  @Output('showAside') showAside = new EventEmitter<boolean>()
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.storeData = sessionStorage.getItem("userInfo")
    this.userInfo = JSON.parse(this.storeData);
    this.token = 'Bearer ' + this.userInfo.authorization.token
    this.admin = JSON.parse(sessionStorage.getItem("admin")!);
  }

  logOut() {
    axios.get(sessionStorage.getItem("url") + '/logout', {
      headers: {
        'Authorization': this.token,
      }
    }).then((response) => {
      // console.log(response)
      sessionStorage.clear()
      this.router.navigate(['/login'])
    }).catch((error) => {
      console.error(error)
    })
  }
  showNavbar() {
    this.showAside.emit(true)
  }
}
