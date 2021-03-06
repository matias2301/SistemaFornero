import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';

import { UserRegister, RegisterResponse, LoginResponse, UserLogin } from '../interfaces/authUser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:8000';
  ACCESS_TOKEN = 'auth-token';
  authSubject = new BehaviorSubject({
    id: '',
    name: '',
    role: '',
    logged: false
  });

  constructor(
    private httpClient: HttpClient,
    private router: Router,    
  ) {
    this.checkToken();
  }


  checkToken() {
    
    if ( localStorage.getItem(this.ACCESS_TOKEN) ) {
      
      this.authSubject.next({
        id: localStorage.getItem('ID'),
        name: localStorage.getItem('NAME'),
        role: localStorage.getItem('ROLE'),
        logged: true
      });
    }    
  }

  register(user: UserRegister): Observable<RegisterResponse> {

    return this.httpClient
    .post<RegisterResponse>(`${this.AUTH_SERVER_ADDRESS}/api/users`, user)
    .pipe(
      map( res => res ),
    )
  }

  login(user: UserLogin): Observable<LoginResponse> {

    return this.httpClient
    .post<LoginResponse>(`${this.AUTH_SERVER_ADDRESS}/api/auth`, user)
    .pipe(
      map( res => {                
        if (res.success) {                  
          localStorage.setItem(this.ACCESS_TOKEN, res.token);
          localStorage.setItem('ID', `${res.user.id}`);
          localStorage.setItem('NAME', `${res.user.name}`);
          localStorage.setItem('ROLE', `${res.user.role}`);
          
          this.authSubject.next({
            id: String(res.user.id),
            name: res.user.name,
            role: res.user.role,
            logged: true
          });                            
        }  
        return res 
      }),
    );
  }

  logout() {

    localStorage.removeItem(this.ACCESS_TOKEN)
    this.authSubject.next({
      id: '',
      name: '',
      role: '',
      logged: false
    });
    this.router.navigateByUrl('login');    
  }

  isAuthenticated() {

    if (!this.authSubject.value.logged) {
      this.router.navigateByUrl('login');
    }
    return this.authSubject.value.logged;
  }

}
