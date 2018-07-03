import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { Subscription } from 'rxjs';
import { SessionService } from '../../login/session.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  public from = 0;
  public pageSize = 50;
  public isLoggedIn = false;

  private subscriptions: Subscription[] = [];

  public books: Book[] = [];

  constructor(private bookService: BookService, private sessionService: SessionService) { }

  ngOnInit() {
    this.loadNextPage();

    this.subscriptions.push(this.bookService.bookUpdateSubject.subscribe((book) => {
      this.books.unshift(book);
    }));

    this.subscriptions.push(this.sessionService.currentSubject.subscribe((user) => {
      this.isLoggedIn = (user != null);
    }));
  }

  onScroll() {
    this.from = this.from + this.pageSize;
    this.loadNextPage();
  }

  loadNextPage() {
    console.log("load next books page: ", this.from);

    this.subscriptions.push(this.bookService.list(this.from, this.pageSize).subscribe((books) => {
      this.books = this.books.concat(books);
    }, (error) => {
      console.log(error);
    }));

  }

  updatePrice(book) {
    console.log(book);
    this.bookService.update(book).subscribe((book) => {
      console.log(book);
      var index = this.books.findIndex((obj => obj.id == book.id));
      this.books[index].price = book.price;
    }, (response: HttpErrorResponse) => {
      console.log("failed to set price", response);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
