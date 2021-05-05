import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  submitted = false;

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    subject: new FormControl('',[Validators.required]),
    text: new FormControl('',[Validators.required])
  })
  constructor(private toastr: ToastrService, private contactService: ContactService) { }
  
  ngOnInit(): void {
  }
  Contact(){
    this.submitted = true
    if (this.contactForm.invalid) {
      this.toastr.warning('Please complete');
      return;
    }
    this.contactService.contacts(this.contactForm.value).subscribe((response)=>{
      this.toastr.success('Mail send successfully.');
    },(error)=>{
      console.log(error);
      
    })
  }
}
