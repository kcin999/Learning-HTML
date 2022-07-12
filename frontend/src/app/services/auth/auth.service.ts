import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
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

  login(username: string, password: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(environment.backendurl + 'login', body, { headers: headers, withCredentials: true });
  }

  register(username: string, password: string, email: string, name: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('email', email);
    body.set('name', name);

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(environment.backendurl + 'register', body, { headers: headers, withCredentials: true });
  }

  logout() {
    return this.http.get(environment.backendurl + 'logout', { withCredentials: true });
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(environment.backendurl + 'is_authenticated', { withCredentials: true });
  }

  get_user_data(): Observable<any> {
    return this.http.get(environment.backendurl + 'get_user_data', { withCredentials: true });
  }
}
