import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoginComponent } from './login/login/login.component';
import { JwtInterceptor } from './login/auth.interceptor';
import { NewbookComponent } from './book/newbook/newbook.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    LoginComponent,
    NewbookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
