import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:8000';

  constructor(
    private httpClient: HttpClient,
    // private router: Router,
  ) { }


  getData(route: string): Observable<any> {

    return this.httpClient
    .get<any>(`${this.AUTH_SERVER_ADDRESS}/api/${route}`)
    .pipe(
      map( res => res ),
    )
  }

  getDataById(route: string, id: number): Observable<any> {

    return this.httpClient
    .get<any>(`${this.AUTH_SERVER_ADDRESS}/api/${route}/${id}`)
    .pipe(
      map( res => res ),
    )
  }

  createRecord(route: string, values: any): Observable<any> {

    return this.httpClient
    .post<any>(`${this.AUTH_SERVER_ADDRESS}/api/${route}`, values)
    .pipe(
      map( res => res ),
    )
  }

  deleteRecord(route: string, id: number): Observable<any> {

    let token = localStorage.getItem('auth-token');    
    let httpOptions = {
      headers: new HttpHeaders({
        'x-token': token
      })
    };
    
    return this.httpClient
    .delete<any>(`${this.AUTH_SERVER_ADDRESS}/api/${route}/${id}`, httpOptions)
    .pipe(
      map( res => res ),
    )
  }

  updateRecord(route: string, id: number, values: any): Observable<any> {

    let token = localStorage.getItem('auth-token');    
    let httpOptions = {
      headers: new HttpHeaders({
        'x-token': token
      })
    };
    
    return this.httpClient
    .put<any>(`${this.AUTH_SERVER_ADDRESS}/api/${route}/${id}`, values, httpOptions)
    .pipe(
      map( res => res ),
    )
  }

}
