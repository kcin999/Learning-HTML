import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  username = new FormControl(undefined, [Validators.required]);
  password = new FormControl(undefined, [Validators.required]);
  hidePassword = true;
  invalidLogin = false;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.login = new FormGroup({
      username: this.username,
      password: this.password
    });

  }

  getUsernameErrorMessage(){
    return this.username.hasError('required') ? 'You must enter a value': '';
  }
  getPasswordErrorMessage(){
    return this.password.hasError('required') ? 'You must enter a value': '';
  }

  onSubmit(){
    this.authService.login(this.login.value['username'], this.login.value['password']).subscribe(data => {
      console.log(data)
      this.route.navigate(['/home']);
      this.invalidLogin = false;
    },error => {
      this.invalidLogin = true;
    });
  }

}
