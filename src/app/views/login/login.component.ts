import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoginregisterService } from './services/loginregister.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',

})
export class LoginComponent {
  @ViewChild('infoModal') public infoModal: ModalDirective;
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

  forgotPassword: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  forgotSubmitted = false;

  constructor(private company: LoginregisterService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
  }
  register() {
    this.registerSubmitted = true
    if (this.registerForm.invalid) {
      return;
    }
    this.company.registerCompany(this.registerForm.value).subscribe((response: any) => {
      this.toastr.success('You are succesfully registered.', 'Registered');
      this.router.navigate(['/login'])
    },
      (error) => {
        console.log(error);
        this.toastr.error('This email *' + this.registerForm.value.email + '* alreay exists, please enter an other email!', 'Register Failed');
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
      this.toastr.success('You are succesfully logged in !.', 'Logged in');
    },
      (error) => {
        console.log(error);
        this.toastr.error('Please verify your email and password!', 'Login Failed');
      })
  }
  forgot(){
    if (this.forgotPassword.invalid) {
      return;
    }
    this.company.forgotPassword(this.forgotPassword.value).subscribe((response:any)=>{
      this.toastr.success('An e-mail was sent to '+this.forgotPassword.value.email+' Please check your mailbox.', 'Email sent!');
    },
    (error) => {
      console.log(error);
      this.toastr.error('This email is not registered!', 'Error');
    })
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
