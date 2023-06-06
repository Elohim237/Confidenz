import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { URL } from '../classes/base-url';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  upload = false;
  compagnyInfo: any;
  storeData: any;
  token!: string;
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.storeData = localStorage.getItem("userInfo")
    this.compagnyInfo = JSON.parse(this.storeData);
    this.token = 'Bearer ' + this.compagnyInfo.authorization.token
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
