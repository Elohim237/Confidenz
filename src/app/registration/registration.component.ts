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
  // passwordMatchValidator(formGroup: FormGroup) {
  //   const passwordControl = formGroup.get('password');
  //   const confirmPasswordControl = formGroup.get('confirmPassword');
  //   if (passwordControl?.value !== confirmPasswordControl?.value) {
  //     confirmPasswordControl?.setErrors({ passwordMismatch: true });
  //   } else {
  //     confirmPasswordControl?.setErrors(null);
  //   }
  // }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('passwordConfirmation');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  }
  // registerform = new FormGroup({
  //   name: new FormControl(),
  //   email: new FormControl(),
  //   password: new FormControl(),
  //   confirmpassword: new FormControl()
  // })
  // validationUserMessage ={
  //   email:[
  //     {type:"required", message:"Please enter your Email"},
  //     {type:"pattern", message:"The Email entered is Incorrect. Try again"}
  //   ],
  //   password:[
  //     {type:"required", message:"Please enter your password!"},
  //     {type:"minlength", message:"The Password must be at least 5 characters or more"}
  //   ],
  //   name:[
  //     {type:"required", message:"Please enter your name!"}
  //   ],
  //   retapepassword:[
  //     {type:"required", message:"Please enter your password!"},
  //     {type:"minlength", message:"The Password must be at least 5 characters or more"}
  //   ],
  // }


  register(){
    console.log(this.registrationForm.value);
    // let result={name:this.registerform.value.name,email: this.registerform.value.email, password: this.registerform.value.password, password_confirmation:this.registerform.value.confirmpassword} 
    // console.log(result);
    // this.authservice.register(result);
  }
}
