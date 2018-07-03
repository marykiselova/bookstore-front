import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SessionService } from '../../login/session.service';
import { BookService } from '../book.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css']
})
export class NewbookComponent implements OnInit, OnDestroy {
  
  public isLoggedIn = false;
  public name: String;
  public saveError: String;

  private subscriptions: Subscription[] = [];

  constructor(private sessionService: SessionService, private bookService: BookService) { }

  ngOnInit() {
    this.subscriptions.push(this.sessionService.currentSubject.subscribe((currentUser) => {
      this.isLoggedIn = (currentUser != null);
    }));
  }

  saveBook() {
    this.saveError = null;

    this.subscriptions.push(this.bookService.create(this.name).subscribe((book) => {
      this.bookService.bookUpdateSubject.next(book);

      // reload books list
      this.name = "";
    }, (response: HttpErrorResponse) => {
      console.log(response);
      this.saveError = response.message;
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
