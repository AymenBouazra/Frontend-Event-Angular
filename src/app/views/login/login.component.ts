import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  registerSubmitted = false;
  loginSubmitted = false;
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [ Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)])
  },{
    validators: [this.passwordConfirmation]
  });
  loginForm: FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password :new FormControl('',[Validators.required]),
  });
  constructor(private  router:Router) { }

  ngOnInit(): void {
  }
  register() {
    this.registerSubmitted = true
    if (this.registerForm.invalid) {
      return;
    }
    const users = JSON.parse(localStorage.getItem('Registered') || '[]')
    users.push(this.registerForm.value)
    localStorage.setItem('Registered', JSON.stringify(users))
    console.log(users);
    

  }
  passwordConfirmation(group: AbstractControl) : { [key: string]: any } | null{
    const password= group.get('password')
    const passwordConfirmation= group.get('passwordConfirmation') 
    if (password?.pristine || passwordConfirmation?.pristine){
      return null ;
    }     
    return password && passwordConfirmation && password.value!==passwordConfirmation.value ? {'mismatch': true} : null
  }
  
  
 login(){
  this.loginSubmitted= true;
  if(this.loginForm.invalid){ 
    return;
  }
  var users = JSON.parse(localStorage.getItem('Registered') || '[]' ) 
  let connect = users.find((x:any) =>x.email == this.loginForm.value.email && x.password==this.loginForm.value.password) 
  if(connect==undefined){
    alert('verify your email and password')
  } else {
    this.router.navigateByUrl('/dashboard')
    
  }
 }
}
