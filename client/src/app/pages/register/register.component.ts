import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  passFormGroup: FormGroup;
  confirmPassFormGroup: FormGroup; 
  matchingPassGroup: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;

  // @ViewChild('stepper') private stepper: { next: () => void; };

  constructor(
    public _formBuilder: FormBuilder,
    private router: Router,   
  ){
    this.createForms();
  }

  ngOnInit() {
  }

  createForms() {
    this.nameFormGroup = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,        
      ])),
    });

    this.emailFormGroup = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });

    this.passFormGroup = new FormGroup({
      password: new FormControl('', Validators.compose([        
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9!$%@#£€*?&-_]+$')
      ]))
    });

    this.confirmPassFormGroup = new FormGroup({      
      confirmPass: new FormControl('', Validators.required),
    }, (formGroup: FormGroup) => {
      return PasswordValidator.confirmPass(formGroup, this.passFormGroup.value.password);
    });
  }

  onSubmitRegister(){
    
    console.log(this.confirmPassFormGroup)

    // console.log('nameFormGroup', this.nameFormGroup.value.name);
    // console.log('emailFormGroup', this.emailFormGroup.value.email);
    // console.log('passFormGroup', this.passFormGroup.value.password);    
    // console.log('confirmPassFormGroup', this.confirmPassFormGroup.value.confirmPass);

    // if( this.emailFormGroup.invalid ){
    //   Object.values( this.emailFormGroup.controls ).forEach( control => {
    //     control.markAsTouched();
    //   });
    // } else {
    //   this.stepper.next();
    //   const user = {        
    //     email: values.email,        
    //   }       
    
    // // this.error = false;
    // }
  }

  goToLogin(){    
    this.router.navigateByUrl('login');
  }

}