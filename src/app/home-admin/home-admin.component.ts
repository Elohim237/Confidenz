import { Component } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    // Do something with the file (e.g. upload it to a server)
  }
}
