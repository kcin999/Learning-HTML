import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.login = new FormGroup({
      username: this.username,
      password: this.password
    })
  }

  getUsernameErrorMessage(){
    return this.username.hasError('required') ? 'You must enter a value': '';
  }
  getPasswordErrorMessage(){
    return this.password.hasError('required') ? 'You must enter a value': '';
  }

  onSubmit(){
    console.log(this.login.value)
    this.authService.login(this.login.value['username'], this.login.value['password']);
  }

}
