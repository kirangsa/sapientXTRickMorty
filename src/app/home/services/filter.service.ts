import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  private subject$ = new Subject<any>();
  filterRemoved$ = this.subject$.asObservable();

  removeFilter(value, key) {
    this.subject$.next({ value, key });
  }
}
