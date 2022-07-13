import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-ui';
  isLoggedIn: boolean;
  userdata: {name: string, username: string, email: string}

  constructor(private authGuard: AuthGuard, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.authGuard.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.getUserData();
    })
  }

  getUserData(){
    this.authService.get_user_data().subscribe(data => {
      this.userdata = data;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
