import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): void {
    let body = {
      username: username,
      password: password
    }
    console.log(body)
    this.http.post(environment.backendurl + 'login', body).subscribe((response) => {
      this.isLoggedIn.next(true);
      this.router.navigate(['/home'])
    },
      (error) => {
        console.log(error)
        this.isLoggedIn.next(false);

      })
  }

  logout() {
    this.http.get(environment.backendurl + 'logout').subscribe((response) => {
      this.isLoggedIn.next(false);
    })
  }

  isAuthenticated() {
    return this.http.get(environment.backendurl + 'isAuthenticated')
  }
}
