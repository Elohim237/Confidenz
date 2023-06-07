import { Component } from '@angular/core';
import axios from 'axios';
import { URL } from '../classes/base-url';
import { ExcelConfigurationService } from '../services/excel-configuration.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

export class DocumentsComponent {
  storeData: any;
  compagnyInfo: any;
  docs: any;
  messageSucced!: string;
  count = false;
  currentPage = 1;
  filteredData: any[] = [];
  searchText!: string;
  actionDelete = false;
  loaderpage = true;
  updateForm!: FormGroup;
  loader: Boolean = false;
  errorCode: Boolean = false;
  errormessage: any;
  ShowNavbar = false;
  constructor(private excelService: ExcelConfigurationService, private router: Router, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      name: [null, Validators.required],
      droit: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.storeData = localStorage.getItem("userInfo")
    this.compagnyInfo = JSON.parse(this.storeData);
    console.log(this.compagnyInfo)
    this.listDocCompagnies();
    this.messageSucced = this.excelService.getmessageSuccedExcel();
    if (this.messageSucced != undefined) {
      this.count = true;
    }
    console.log("message", this.excelService.getmessageSuccedExcel());
  }
  listDocCompagnies() {
    axios.get(URL.COMPAGNY_URL + '/files', {
      headers: {
        'Authorization': 'Bearer ' + this.compagnyInfo.authorization.token,
      }
    }).then((response) => {
      this.docs = response.data.files;
      this.filteredData = response.data.files;
      this.loaderpage = false;
      console.log(this.docs)
      console.log(response)
    }).catch((error) => {
      console.error(error)
    })
  }
  updateFilteredData() {
    // Appliquer le filtre sur les données en utilisant comme critere le nom du Docs
    this.filteredData = this.docs.filter((item: any) => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  deletedDoc(idDoc: any) {
    this.actionDelete = true;
    axios.delete(URL.COMPAGNY_URL + '/files/' + idDoc + '/delete', {
      headers: {
        'Authorization': 'Bearer ' + this.compagnyInfo.authorization.token
      }
    }).then((response) => {
      this.actionDelete = false;
      console.log(response)
      window.location.reload()
    }).catch((error) => {
      this.actionDelete = false;
      console.error(error)
    })
  }

  setUpdateForm(idDoc: any) {
    this.updateForm = this.formBuilder.group({
      name: [this.getDocInfoById('name', idDoc), Validators.required],
      droit: [this.getDocInfoById('rights', idDoc), Validators.required],
    });
  }

  updateDoc(idDoc: any) {
    this.loader = true;
    this.actionDelete = true;
    console.log('le idDoc', idDoc);

    let formdata = new FormData();
    formdata.append("name", this.updateForm.value.name);
    formdata.append("rights", this.updateForm.value.droit);

    axios.post(URL.COMPAGNY_URL + '/files/' + idDoc + '/update', formdata, {
      headers: {
        'Authorization': 'Bearer ' + this.compagnyInfo.authorization.token
      }
    }).then((response) => {
      this.loader = false;
      console.log(response)
      window.location.reload()
    }).catch((error) => {
      this.loader = false;
      this.errorCode = true;
      this.errormessage = error.response.data.message.name ?? error.response.data.message.rights ?? error.response.data.error
      console.error(error)
    })
  }

  toPage(doc: any) {
    localStorage.removeItem('Doc');
    localStorage.removeItem('count');
    localStorage.removeItem('firstvisite');
    localStorage.setItem('firstvisite', 'firstvisite')
    localStorage.setItem('Doc', JSON.stringify(doc));
    localStorage.setItem('count', JSON.stringify(doc.heading_level))
    this.router.navigate(['/documents/detail', doc.root_id])
  }

  getDocInfoById(info: 'name' | 'rights', id: number) {
    return this.docs.find((item: any) => item.id == id)[info];
  }
}
