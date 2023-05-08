import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  upload=false;
  userInfo:any;
  storeData:any;
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo")
    this.userInfo=JSON.parse(this.storeData);

    console.log(this.userInfo);
  }
}
