import { Injectable } from '@angular/core';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { URL } from '../classes/base-url';
axios.defaults.withCredentials = true;

@Injectable({
  providedIn: 'root'
})
export class CreateEmployeeService {
  create = false;
  constructor() { }
  async createEmployeFile(compagnies: any, file: any) {
    console.log(compagnies);
    console.log(file);
    axios.post(URL.COMPAGNY_URL + '/upload/employees', file, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + compagnies.token,
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  CreateEmployeByForm(compagnies: any, formData: any) {
    axios.post(URL.COMPAGNY_URL + '/employee/register', formData, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + compagnies.token,
        'Content-Type': 'multipart/form-data'
      }

    }).then((response) => {
      console.log(response.data.message);
      this.create = true;
      console.log(this.create)
    })

  }
  getCreate() {
    return this.create;
  }
}
