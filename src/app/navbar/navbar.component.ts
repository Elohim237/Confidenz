import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  upload=false;
  compagnInfo:any;
  storeData:any;
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo")
    this.compagnInfo=JSON.parse(this.storeData);
    console.log(this.compagnInfo);
  }
}
