import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from '../session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
 
  public username: String;
  public password: String;
  public loginError: String;
  public isLoggedIn : boolean = false;


  private subscriptions : Subscription[] = [];

  constructor(private loginService: LoginService, private sessionService : SessionService) { }

  ngOnInit() {
  }

  doLogin() {
    this.subscriptions.push(this.loginService.login(this.username, this.password).subscribe((user) => {
      localStorage.setItem('token', user.id);
      this.sessionService.setCurrent(user);
      this.isLoggedIn = true;

    }, (response: HttpErrorResponse) => {
      this.loginError = response.error.error.message;
      this.sessionService.setCurrent(null);
      this.isLoggedIn = false;
      
    }));
  }

  doLogout(){
    this.isLoggedIn = false;
    localStorage.removeItem("token");
    this.sessionService.setCurrent(null);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
