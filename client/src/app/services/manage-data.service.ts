import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
