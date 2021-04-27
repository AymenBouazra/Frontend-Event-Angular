import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



import { LoginregisterService } from './services/loginregister.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',

})
export class LoginComponent {
  
  registerSubmitted = false;
  loginSubmitted = false;
  registerForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, {
    validators: [this.passwordConfirmation]
  });
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
 

  constructor(private company: LoginregisterService, private router: Router,private toastr:ToastrService) {} 
  ngOnInit(): void {
  }
  register() {
    this.registerSubmitted = true
    if (this.registerForm.invalid) {
      return;
    }
    this.company.registerCompany(this.registerForm.value).subscribe((response: any) => {
      this.toastr.success( 'You are succesfully registered.','Registered');
      this.router.navigate(['/login'])
    },
      (error) => {
        console.log(error);
        this.toastr.error( 'This email *'+this.registerForm.value.email+'* alreay exists, please enter an other email!','Register Failed');
      })
  }
  passwordConfirmation(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('password')
    const passwordConfirmation = group.get('passwordConfirmation')
    if (password?.pristine || passwordConfirmation?.pristine) {
      return null;
    }
    return password && passwordConfirmation && password.value !== passwordConfirmation.value ? { 'mismatch': true } : null
  }


  login() {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.company.loginCompany(this.loginForm.value).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/dashboard'])
      this.toastr.success( 'You are succesfully logged in !.','Logged in');
    },
      (error) => {
        console.log(error);
        this.toastr.error( 'Please verify your email and password!','Login Failed');
      }) 
  }
  logout(){
    
  }
}
