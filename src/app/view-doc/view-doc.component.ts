import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { URL } from '../classes/base-url';
import { Router, NavigationExtras, NavigationStart, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.component.html',
  styleUrls: ['./view-doc.component.css']
})
export class ViewDocComponent {
  storeData: any;
  userInfo: any;
  documents: any;
  docData: any;
  exceldoc: any;
  id: any;
  employee = new Set();
  loader: Boolean = true;
  oneDoc = false;
  oneElement: any;
  headinglevel = true;
  heading!: number;
  counter!: number;
  count!: number;
  firstvisited: any;
  stop: Boolean = false;
  breadcumbs: any[] = [];
  ShowNavbar = false;
  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
    const currentUrl = this.router.url.split('?')[0];

  }

  ngOnInit(): void {
    // empecher l'utilisateur de retourner en arriere sur le navigateur
    history.pushState(null, '');
    window.onpopstate = function (event) {
      history.go(1);
    };
    this.storeData = localStorage.getItem("userInfo")
    this.userInfo = JSON.parse(this.storeData);
    this.docData = localStorage.getItem("Doc");
    this.exceldoc = JSON.parse(this.docData);
    this.id = this.route.snapshot.paramMap.get('id');
    this.firstvisited = localStorage.getItem("firstvisite");

    //premiere visite du site 
    if (this.firstvisited == "firstvisite") {
      // Actions à effectuer lors de la première visite
      this.listdoc(this.exceldoc.root_id);
      const storedCount = localStorage.getItem('count');
      if (storedCount == "1") {
        this.counter = 1;
        this.stop = true;
      }
      localStorage.setItem('firstvisite', 'visited')

    }
    // deuxieme visite du site
    else {
      console.log("seconde fois");
      let doc: any;
      this.loader = false
      doc = localStorage.getItem('Documents');
      this.documents = JSON.parse(doc);
    }
  }
  // lsite des fichiers
  listdoc(id: any) {
    let BearerToken = 'Bearer' + this.userInfo.authorization.token
    axios.get(URL.COMPAGNY_URL + '/files/' + id, {
      headers: {
        'Authorization': 'Bearer ' + this.userInfo.authorization.token,
      }
    }).then((response) => {
      console.log("response", response)
      this.loader = false;
      let myArray = []
      myArray = response.data.content[0].children
      if (myArray.length === 0) {
        this.loader = false;
        this.oneDoc = true;
        console.log("seul");
        this.oneElement = response.data;
      }
      else {
        this.oneDoc = false;
        this.loader = false;
        this.documents = response.data.content;
        console.log(this.breadcumbs)
      }
      console.log("le document", this.documents)
    }).catch((error) => {
      this.loader = false
      console.error(error)
    })

  }
  // aller dans le contenu du fichier
  viewElement(docs: any) {
    console.log('docs', docs);
    localStorage.removeItem('viewElement');
    localStorage.setItem('viewElement', JSON.stringify(docs));
    localStorage.removeItem('firstvisiteview');
    localStorage.setItem('firstvisiteview', 'firstvisite');

    this.router.navigate(['/detail/', this.id, 'liste'])
  }

  // parcourir l'arbre
  return(documents: any) {
    const storedCount = localStorage.getItem('count');
    if (storedCount) {
      this.count = parseInt(storedCount, 10);
      this.count--;
      if (this.count <= 1) {
        this.count = 1;
        this.stop = true;
        console.log("le truer")
      }

    } else {
      this.count = this.exceldoc.heading_level;
    }
    localStorage.setItem('count', this.count.toString());
    localStorage.removeItem('Documents');
    localStorage.setItem('Documents', JSON.stringify(documents.children));
    let doc: any;
    doc = localStorage.getItem('Documents');
    this.documents = JSON.parse(doc);
    this.breadcumbs.push({
      value: documents
    })
    console.log(this.breadcumbs)
  }

  // gestion Breadcumbs
  toPrevent(documents: any) {

    const storedCount = localStorage.getItem('count');
    if (storedCount) {
      this.count = parseInt(storedCount, 10);
      this.count = this.count + 1;
      this.stop = false;
    } else {
      this.count = this.exceldoc.heading_level;
    }
    localStorage.setItem('count', this.count.toString());
    localStorage.removeItem('Documents');
    localStorage.setItem('Documents', JSON.stringify(documents.children));
    let doc: any;
    doc = localStorage.getItem('Documents');
    this.documents = JSON.parse(doc);
    const i = this.breadcumbs.findIndex((it) => it.value.value == documents.value);
    console.log(this.breadcumbs, i);
    this.breadcumbs = this.breadcumbs.filter((it, index) => index <= i);
    console.log(this.breadcumbs);

  }
}
