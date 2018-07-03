import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from './book.model';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public bookUpdateSubject = new Subject<Book>();


  constructor(private http: HttpClient) { }

  public list(from, pageSize): Observable<Book[]> {
    const params = new HttpParams()
      .set('filter', '{"limit" : ' + pageSize + ', "skip" : ' + from + ', "order" : "id DESC"}')

    return this.http.get(environment.API_URL + "/books", { params: params })
      .pipe(map((response) => <Book[]>response));
  }

  public create(name): Observable<Book> {
    return this.http.post(environment.API_URL + "/books", { name: name })
      .pipe(map((response) => <Book>response));
  }

  public update(book: Book): Observable<Book> {
    return this.http.patch(environment.API_URL + "/books/" + book.id, { name: book.name, price: book.price })
      .pipe(map((response) => <Book>response));
  }
}
