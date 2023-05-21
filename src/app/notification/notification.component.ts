import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { URL } from '../classes/base-url';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  ngOnInit(){

  }
  listeNotification(){
    axios.get(URL.COMPAGNY_URL)
  }
}
