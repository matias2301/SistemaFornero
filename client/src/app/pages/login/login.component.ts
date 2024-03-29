import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AlertsService } from '../../services/alerts.service';

import { Router } from '@angular/router';

import { UserLogin, LoginResponse } from '../../interfaces/authUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  @ViewChild('inputPassword') inputPassword: ElementRef;

  emailFormGroup: FormGroup;
  passFormGroup: FormGroup;  
  hide: boolean = true;  

  constructor(    
    private router: Router,
    private _authService: AuthService,  
    private _alertsService: AlertsService,
  ){
    this.createForms();
  }

  ngOnInit() {
    this.checkLoginState();
  }

  createForms() {
    this.emailFormGroup = new FormGroup({      
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.maxLength(40)
      ])),
      remember: new FormControl(''),
    });

    this.passFormGroup = new FormGroup({
      password: new FormControl('', Validators.compose([        
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9!$%@#£€*?&-_]+$')
      ]))
    });
  }

  next() {
    setTimeout(() => {
      this.inputPassword.nativeElement.focus();
    }, 250);    
  }  

  onSubmitLogin($ev?: any){
    if ($ev) {
      $ev.preventDefault();
      this.passFormGroup.controls.password.markAsTouched();
    }

    if( !this.passFormGroup.controls.password.errors ){
      
      const user: UserLogin = {        
        email: this.emailFormGroup.value.email,
        password: this.passFormGroup.value.password
      }

      this._authService.login(user)
        .subscribe((res: LoginResponse) => {    

          if( res.success){            
            this._alertsService.alertToast(res.msg, 'success')
              .then( () => {
                if( this.emailFormGroup.controls.remember.value ){
                  localStorage.setItem('remember', this.emailFormGroup.value.email);
                } else {
                  localStorage.removeItem('remember');
                }
                this.router.navigateByUrl('dashboard');
              });
          }

        }, ( err ) => {
          
            let errorMsg = '';
            
            if( err.error.msg ){
              errorMsg = err.error.msg
            } else {
              errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
            }

            this._alertsService.alertToast(errorMsg, 'error');
          }                        
        );
    }
  }

  // CHECK LOGIN STATE
  checkLoginState(){
    const email = localStorage.getItem('remember');
    
    if ( email ) {        
      this.emailFormGroup.reset({
        email,
        remember: true
      });        
    }
    
    this._authService.authSubject.subscribe( state => {
      if (state.logged) {
        this.router.navigateByUrl('dashboard');
      }
    });
  }

}