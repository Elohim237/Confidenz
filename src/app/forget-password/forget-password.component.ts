import { Component } from '@angular/core';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { AutServiceService } from '../services/aut-service.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private authservice : AutServiceService,private formBuilder: FormBuilder){}
  ForgetForm!: FormGroup;
  ngOnInit(): void {
    this.ForgetForm = this.formBuilder.group({
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
  
  forget(){
    console.log(this.ForgetForm.value);
    let result={password: this.ForgetForm.value.password, password_confirmation:this.ForgetForm.value. passwordConfirmation}
    // let result={name:this.registerform.value.name,email: this.registerform.value.email, password: this.registerform.value.password, password_confirmation:this.registerform.value.confirmpassword} 
     console.log(result);
    this.authservice.register(result);
  }
}
