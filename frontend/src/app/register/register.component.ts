import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  username = new FormControl(undefined, [Validators.required]);
  password = new FormControl(undefined, [Validators.required]);
  email = new FormControl(undefined, [Validators.required, Validators.email])
  name = new FormControl(undefined, [Validators.required])
  hidePassword = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      email: this.email,
      name: this.name
    })
  }

  getNameErrorMessage(){
    return this.name.hasError('required') ? 'You must enter a value': '';
  }
  getEmailErrorMessage(){
    if (this.email.hasError('required')) {
      return "You must enter a value"
    }else if (this.email.hasError('email')){
      return "Please enter a valid email address"
    }
    return '';
  }
  getUsernameErrorMessage(){
    return this.username.hasError('required') ? 'You must enter a value': '';
  }
  getPasswordErrorMessage(){
    return this.password.hasError('required') ? 'You must enter a value': '';
  }

  onSubmit() {
    this.authService.register(this.registerForm.value['username'], this.registerForm.value['password'], this.registerForm.value['email'], this.registerForm.value['name']);
  }

}
