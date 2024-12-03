import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService {
  private title = new BehaviorSubject<string>('');
  public titleObs: Observable<string> = this.title.asObservable();

  constructor() { }

  setTitle(title: string) {
    this.title.next(title);
  }

}
