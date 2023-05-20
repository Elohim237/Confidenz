import { Component } from '@angular/core';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { AutServiceService } from '../services/aut-service.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { URL } from '../classes/base-url';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private authservice : AutServiceService,private formBuilder: FormBuilder,private router:Router){}
  registrationForm!: FormGroup;
  showPassword: boolean = false;
  succeedCreation!:string;
  loader:boolean=false;
  errormessage!:string;
  errorstatut:boolean=false;
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('passwordConfirmation');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  }
  
  register(){
    this.loader=true;
    let result={name:this.registrationForm.value.name, email: this.registrationForm.value.email, password: this.registrationForm.value.password, password_confirmation:this.registrationForm.value. passwordConfirmation}
    axios.post(URL.COMPAGNY_URL + '/register', result).then((response:any)=>{
      this.loader=false;
      console.log("response",response.data.message);
      this.succeedCreation=response.data.message;
      this.authservice.setMessageCreation(this.succeedCreation)
      this.router.navigate(['/'])
      }).catch((error)=>{
        this.loader=false;
        this.errormessage= error.response.data.message ?? error.response.data.error
        this.errorstatut=true;
        console.log(error)
      })

  }
}
