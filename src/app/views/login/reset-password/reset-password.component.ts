import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginregisterService } from '../services/loginregister.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  submitted= false;
  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
    token:new FormControl('',[]),
  }, {
    validators: [this.passwordConfirmation]
  });
  constructor(private company: LoginregisterService, private route:ActivatedRoute ,private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  reset(){
    this.submitted = true
    if (this.resetPasswordForm.invalid) {
      this.toastr.error('Please put your password and password confirmation. ', 'Failed');
      return;
    }else if (this.resetPasswordForm.valid){
      const Token = this.route.snapshot.params.token
    this.resetPasswordForm.controls.token.setValue(Token)
    this.company.resetPassoword(this.resetPasswordForm.value).subscribe((response: any) => {
      this.toastr.success('You succesfully reset your password. ', 'Password reset successfully!');
      this.router.navigate(['/login'])
    }, (error) => {
      console.log(error);
      this.toastr.error(error.error.message, 'Password reset failed!');
    })
   
  }
  console.log(this.resetPasswordForm.value);
  
      
  }
  passwordConfirmation(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('password')
    const passwordConfirmation = group.get('passwordConfirmation')
    if (password?.pristine || passwordConfirmation?.pristine) {
      return null;
    }
    return password && passwordConfirmation && password.value !== passwordConfirmation.value ? { 'mismatch': true } : null
  }
}
