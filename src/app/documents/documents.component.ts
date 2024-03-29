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
  admin: boolean = JSON.parse(sessionStorage.getItem('admin')!);
  storeData: any;
  userInfo: any;
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
    if (!sessionStorage.getItem("userInfo")) {
      this.router.navigate(['/login']);
    }

    this.storeData = sessionStorage.getItem("userInfo")
    this.userInfo = JSON.parse(this.storeData);
    this.listDocCompagnies();
    this.messageSucced = this.excelService.getmessageSuccedExcel();
    if (this.messageSucced != undefined) {
      this.count = true;
    }
    // console.log("message", this.excelService.getmessageSuccedExcel());
  }

  listDocCompagnies() {
    axios.get(sessionStorage.getItem("url") + '/files', {
      headers: {
        'Authorization': 'Bearer ' + this.userInfo.authorization.token,
      }
    }).then((response) => {
      this.docs = response.data.files;
      this.filteredData = response.data.files;
      this.loaderpage = false;
      // console.log(this.docs)
      // console.log(response)
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
        'Authorization': 'Bearer ' + this.userInfo.authorization.token
      }
    }).then((response) => {
      this.actionDelete = false;
      // console.log(response)
      window.location.reload()
    }).catch((error) => {
      this.actionDelete = false;
      console.error(error)
    })
  }

  setUpdateForm(idDoc: number) {
    this.updateForm = this.formBuilder.group({
      name: [this.getDocInfoById('name', idDoc), Validators.required],
      droit: [this.getDocInfoById('rights', idDoc), Validators.required],
    });
  }

  updateDoc(idDoc: any) {
    this.loader = true;
    this.actionDelete = true;
    // console.log('le idDoc', idDoc);

    let formdata = new FormData();
    formdata.append("name", this.updateForm.value.name);
    formdata.append("rights", this.updateForm.value.droit);

    axios.post(sessionStorage.getItem("url") + '/files/' + idDoc + '/update', formdata, {
      headers: {
        'Authorization': 'Bearer ' + this.userInfo.authorization.token
      }
    }).then((response) => {
      this.loader = false;
      // console.log(response)
      window.location.reload()
    }).catch((error) => {
      this.loader = false;
      this.errorCode = true;
      this.errormessage = error.response.data.message.name ?? error.response.data.message.rights ?? error.response.data.error
      console.error(error)
    })
  }

  toPage(doc: any) {
    sessionStorage.removeItem('Doc');
    sessionStorage.removeItem('count');
    sessionStorage.removeItem('firstvisite');
    sessionStorage.setItem('firstvisite', 'firstvisite')
    sessionStorage.setItem('Doc', JSON.stringify(doc));
    sessionStorage.setItem('count', JSON.stringify(doc.heading_level))
    this.router.navigate(['/documents/detail', doc.root_id])
  }

  getDocInfoById(info: 'name' | 'rights', id: number) {
    return this.docs.find((item: any) => item.id == id)[info];
  }
}
