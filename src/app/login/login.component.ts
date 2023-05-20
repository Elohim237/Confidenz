import { Component, importProvidersFrom } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { ConnexionForm } from '../classes/connexion-form';
import { AutServiceService } from '../services/aut-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordCompagnyService } from '../services/change-password-compagny.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword: boolean = false;
  loginForm: FormGroup;
  log=false;
  loader=false;
  error=false;
  errormessage!:string;
  messageDeleteAccount!:string;
  succedDeleted:Boolean=false;
  constructor(private formBuilder: FormBuilder,private autservice: AutServiceService, private router : Router,private changePasswordservice:ChangePasswordCompagnyService) {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.compose( [Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
    
  }
  ngOnInit(){
    this.messageDeleteAccount= this.changePasswordservice.getMessage();
    if(this.messageDeleteAccount != undefined){
      this.succedDeleted=true;
    }
  }
  async onSubmit() {
    if (this.loginForm.invalid) {
      console.error("Champs du formulaire invalides.");
      return;
    }
  

    let result={ email: this.loginForm.value.email, password: this.loginForm.value.password}
    console.log("valide");
    console.log(result);
    this.log=true;
    this.loader=true;
    await this.autservice.login(result).then(()=>{
        this.router.navigate(['homeadmin'])
    }).catch((error :any) => {
      console.log(error)
      this.log=false;
      this.loader=false;
      this.error=true;
      this.errormessage= error.response.data.message ?? error.response.data.error
    });
    // this.router.navigate(['homeadmin'])
  

  }
}

