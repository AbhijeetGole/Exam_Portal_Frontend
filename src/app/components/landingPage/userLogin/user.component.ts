import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  showCreateToast=false
  toggle = false;
  showRegisterToast = false;
  showLoginToast = false;
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
  constructor(private login: LoginService, private apiService: ApiService, private router:Router,
    private cookieService:CookieService,private toastr:ToastrService) {
  }
  repeatPass:string='none';
  userLogin=new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    , password: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9]") ,Validators.minLength(5),Validators.maxLength(13)])
  })
  userEmails = new FormGroup({  
    firstname:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z].*")]),
    lastname:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z].*")]),
    userName:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z].*")]),
   
    email: new FormControl('', [Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    , password: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9]") ,Validators.minLength(5),Validators.maxLength(13)]),
     phone:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10) ,Validators.pattern("[0-9]*")])
     ,confirmpassword:new FormControl('',[Validators.required])
    });
    get EMAIL():FormControl{
      return this.userLogin.get('email') as FormControl
    }
    get PASSWORD():FormControl{
      return this.userLogin.get('password') as FormControl
    }

  get FirstName():FormControl{
    return this.userEmails.get('firstname') as FormControl
  }
  get LastName():FormControl{
    return this.userEmails.get('lastname') as FormControl
  }
  get UserName():FormControl{
    return this.userEmails.get('userName') as FormControl
  }

  get email():FormControl{
    return this.userEmails.get('email') as FormControl
  }
  get Password():FormControl{
    return this.userEmails.get('password') as FormControl
  }
  get mobile():FormControl{
    return this.userEmails.get('phone') as FormControl
  }
  get CPASSWORD():FormControl{
    return this.userEmails.get('confirmpassword') as FormControl
  }

  LoginUser(user: any) {

    this.apiService.LoginUser(user);
    this.showLoginToast = true;

    return 'User logged in successfully!';
  }
 
  registerUser(user: any) {
    // console.log(user.password,user.confirmpassword)
    this.showCreateToast=false
    if(user.password!=user.confirmpassword){
      this.showCreateToast=true
      this.toastr.error("Passwords are not Matching")
      // alert("Passwords are not Matching")
      this.router.navigate([''])
    }
    else{
      this.apiService.registerUser(user)
    this.toggle = !this.toggle
    this.showRegisterToast = true;
    }

    return 'User registered successfully!';
  }
  
  displayReg() {
    this.toggle = !this.toggle
  }
}