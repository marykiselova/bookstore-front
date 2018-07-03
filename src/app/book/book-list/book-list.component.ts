import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
 
  public from = 0;
  public pageSize = 50;
  private subscriptions : Subscription[] = [];

  public books : Book[] = [];

  constructor(private bookService : BookService) { }

  ngOnInit() {
    this.loadNextPage();

    this.subscriptions.push(this.bookService.bookUpdateSubject.subscribe((book) =>{
      this.books.unshift(book);
    }));
  }

  onScroll(){
    this.from = this.from + this.pageSize;
    this.loadNextPage();
  }

  loadNextPage(){
    console.log("load next books page: ", this.from);

    this.subscriptions.push(this.bookService.list(this.from, this.pageSize).subscribe((books)=>{
      this.books  = this.books.concat(books);
    }, (error)=>{
      console.log(error);
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
