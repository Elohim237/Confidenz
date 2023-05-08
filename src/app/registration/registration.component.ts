import { Component } from '@angular/core';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { AutServiceService } from '../services/aut-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private authservice : AutServiceService,private formBuilder: FormBuilder){}
  registrationForm!: FormGroup;
  showPassword: boolean = false;
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
    let result={name:this.registrationForm.value.name, email: this.registrationForm.value.email, password: this.registrationForm.value.password, password_confirmation:this.registrationForm.value. passwordConfirmation}
    // let result={name:this.registerform.value.name,email: this.registerform.value.email, password: this.registerform.value.password, password_confirmation:this.registerform.value.confirmpassword} 
     console.log(result);
    this.authservice.register(result);
  }
}
