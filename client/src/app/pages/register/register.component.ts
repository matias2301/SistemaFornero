import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AlertsService } from '../../services/alerts.service';

import { PasswordValidator } from '../../validators/password.validator';
import { Router } from '@angular/router';

import { UserRegister, RegisterResponse } from '../../interfaces/authUser';

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

  constructor(    
    private router: Router,
    private _authService: AuthService,  
    private _alertsService: AlertsService,
  ){
    this.createForms();
  }

  ngOnInit() {
    this.checkRegisterState();
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
    
    if( this.confirmPassFormGroup.value.confirmPass == "" ) {      
      this.confirmPassFormGroup.controls.confirmPass.setErrors({ error: true });
    }

    if( !this.confirmPassFormGroup.controls.confirmPass.errors ) {

      const user: UserRegister = {
        name: this.nameFormGroup.value.name,
        email: this.emailFormGroup.value.email,
        password: this.passFormGroup.value.password
      } 

      this._authService.register(user)
        .subscribe((res: RegisterResponse) => {

          if( res.success ){            
            this._alertsService.alertToast(`${res.msg} Please Log In`, 'success');            
            this.router.navigateByUrl('login');
          }

        }, ( err ) => {
          
            let errorMsg = '';
            if( err.error.errors){
              errorMsg = err.error.errors[0].msg
            } else {
              errorMsg = 'Something went wrong'
            }
            
            this._alertsService.alertToast(errorMsg, 'error');
          }                        
        );
    }
  
  }

  // CHECK REGISTER STATE
  checkRegisterState(){
    this._authService.authSubject.subscribe( state => {
      if (state) {
        this.router.navigateByUrl('home');
      }
    });
  }

  // GO TO LOGIN PAGE
  goToLogin(){    
    this.router.navigateByUrl('login');
  }

}