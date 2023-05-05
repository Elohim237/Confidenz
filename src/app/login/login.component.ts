import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { ConnexionForm } from '../classes/connexion-form';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
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
      console.log("valide");
      
    }

    // handle form submission
  }
}

