import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, expand, reduce } from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  fetch(page = 0): Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/character/?page=${page}`).pipe(
      expand((res:any) => res.info.next ? this.http.get( res.info.next) : EMPTY),
      reduce((acc, res:any) => acc.concat(res.results), [])
    );;
  }
}
