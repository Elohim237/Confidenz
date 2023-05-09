import { Component, importProvidersFrom } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { ConnexionForm } from '../classes/connexion-form';
import { AutServiceService } from '../services/aut-service.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword: boolean = false;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private autservice: AutServiceService, private router : Router) {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.compose( [Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
    
  }
  async onSubmit() {
    if (this.loginForm.invalid) {
      console.log("invalide");
      return;
    }
    else{
      let result={ email: this.loginForm.value.email, password: this.loginForm.value.password}
      console.log("valide");
      console.log(result);
      await this.autservice.login(result).then(()=>{
        this.router.navigate(['homeadmin'])
      });
      // this.router.navigate(['homeadmin'])
    }

    // handle form submission
  }
}

