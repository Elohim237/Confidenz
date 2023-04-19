import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})

export class AsideComponent implements OnInit{
  currentUrl !: string;
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
   
  }
}
