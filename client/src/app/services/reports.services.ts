import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:8000';

  constructor(
    private httpClient: HttpClient    
  ) { }


  getLackingArticles(filter: any = null): Observable<any> {
    return this.httpClient
    .post<any>(`${this.AUTH_SERVER_ADDRESS}/api/reports/lacking_articles`, filter)
    .pipe(map( res => res ));
  }

  getRepairs(filter: any = null): Observable<any> {
    return this.httpClient
    .post<any>(`${this.AUTH_SERVER_ADDRESS}/api/reports/repairs`, filter)
    .pipe(map( res => res ));
  }

  getPendingPaids(filter: any = null): Observable<any> {
    return this.httpClient
    .post<any>(`${this.AUTH_SERVER_ADDRESS}/api/reports/pending_paids`, filter)
    .pipe(map( res => res ));
  }
}