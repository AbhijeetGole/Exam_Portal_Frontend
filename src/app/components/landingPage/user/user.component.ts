import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  toggle = false;
  loginData = {
    email: '',
    password: ''
  };

  userModel = {
    firstname: '',
    lastname:'',
    email:'',
    userName:'',
    phone:'',
    password:'',
    confirmpassword:''
  }
  constructor(private login: LoginService, private apiService: ApiService, private router:Router,private cookieService:CookieService) {
  }

  LoginUser(user: any) {
    
    if (this.loginData.email.trim() == '' || this.loginData.email == null) {
      alert('Email is Required!!');
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      alert('password is required');
      return;
    }
    this.apiService.LoginUser(user);

  }

  registerUser(user: any) {
    this.apiService.registerUser(user)
    this.toggle = !this.toggle
  }
  
  displayReg() {
    this.toggle = !this.toggle
  }
}