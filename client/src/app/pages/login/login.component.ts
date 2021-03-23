import { Component, OnInit } from '@angular/core';
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
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
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

  onSubmitLogin(){
    
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
                this.router.navigateByUrl('home');
              });
          }

        }, ( err ) => {
          
            let errorMsg = '';
            if( err.error){
              errorMsg = err.error.msg
            } else {
              errorMsg = 'Something went wrong'
            }

            this._alertsService.alertToast(errorMsg, 'error');
          }                        
        );
    }
  }

    // CHECK LOGIN STATE
    checkLoginState(){

      const email = localStorage.getItem('remember');
      console.log(email)
      if ( email ) {        
        this.emailFormGroup.reset({
          email,
          remember: true
        });        
      }
      
      this._authService.authSubject.subscribe( state => {
        if (state) {
          this.router.navigateByUrl('home');
        }
      });
    }

}