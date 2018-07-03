import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../book/book.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(username, password): Observable<User> {

    return this.http.post(environment.API_URL + "/users/login", { username: username, password: password })
      .pipe(map((response) => <User>response));
  }
}
