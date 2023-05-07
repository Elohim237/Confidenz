import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { ConnexionForm } from '../classes/connexion-form';
import { AutServiceService } from '../services/aut-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private autservice: AutServiceService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      console.log("invalide");
      return;
    }
    else{
      let result={ email: this.loginForm.value.email, password: this.loginForm.value.password}
      console.log("valide");
      console.log(result);
      this.autservice.login(result);
      
    }

    // handle form submission
  }
}

