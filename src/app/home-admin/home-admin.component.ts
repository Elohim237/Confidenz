import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  upload=false;
  userInfo:any;
  storeData:any;
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo")
    this.userInfo=JSON.parse(this.storeData);

    console.log(this.userInfo);
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.upload=true;
    console.log(file);
    // Do something with the file (e.g. upload it to a server)
  }
}
