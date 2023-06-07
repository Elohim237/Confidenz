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
  upload = false;
  compagnyInfo: any;
  storeData: any;
  token!: string;
  @Output('showAside')showAside= new EventEmitter<boolean>()
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.storeData = localStorage.getItem("userInfo")
    this.compagnyInfo = JSON.parse(this.storeData);
    this.token = 'Bearer ' + this.compagnyInfo.authorization.token
  }

  logOut() {
    axios.get(URL.COMPAGNY_URL + '/logout', {
      headers: {
        'Authorization': this.token,
      }
    }).then((response) => {
      console.log(response)
      localStorage.clear()
      this.router.navigate(['/login'])
    }).catch((error) => {
      console.error(error)
    })
  }
  showNavbar(){
    this.showAside.emit(true)
  }
}
