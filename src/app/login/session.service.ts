import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Book } from '../book/book.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public current : User;
  currentSubject = new Subject<User>();

  
  constructor() { }

  setCurrent(user: User){
    this.current = user;
    this.currentSubject.next(user);
  }
}
