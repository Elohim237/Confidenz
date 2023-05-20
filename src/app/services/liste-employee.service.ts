import { Injectable } from '@angular/core';
import { URL } from '../classes/base-url';
import axios from 'axios';
import { Observable } from 'rxjs';

axios.defaults.withCredentials=true;
@Injectable({
  providedIn: 'root'
})
export class ListeEmployeeService {

  constructor() { }
 
 
}