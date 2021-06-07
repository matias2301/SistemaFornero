import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:8000';

  stockWatcher = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient    
  ) {
    this.getData('articles')
  }


  getData(route: string): Observable<any> {

    return this.httpClient
    .get<any>(`${this.AUTH_SERVER_ADDRESS}/api/${route}`)
    .pipe(
      map( res => {        
        if( route === 'articles') this.stockWatcher.next(res.articles)
        return res 
      }),
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
      map( res => {        
        if( route === 'articles') this.getData('articles')
        return res 
      }),      
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
      map( res => {        
        if( route === 'articles') this.getData('articles')
        return res 
      }),      
    )
  }

}
