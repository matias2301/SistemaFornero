import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  emailFormGroup: FormGroup;
  passFormGroup: FormGroup;  
  hide: boolean = true;

  @ViewChild('stepper') private stepper: { next: () => void; };

  constructor(){
    this.createForms();
  }

  ngOnInit() {
  }

  createForms() {
    this.emailFormGroup = new FormGroup({      
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });

    this.passFormGroup = new FormGroup({
      password: new FormControl('', Validators.compose([        
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9!$%@#£€*?&-_]+$')
      ]))
    });
  }

  onSubmitEmail(){

    if( this.emailFormGroup.invalid ){
      Object.values( this.emailFormGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.stepper.next();   
    
    // this.error = false;
    }
  }

}

