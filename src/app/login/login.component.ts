import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { LoginService } from '../login.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private loginservice: LoginService, private _router: Router) {
  }
  onSave(email: string, password: string) {
    this.loginservice.loginUser(email, password).subscribe((data: any) => {

       if (data['role'] == 'user') {
        console.log('user')  
        //this._router.navigate('/user')
       }
       else {
       console.log('admin')
      }
       alert(data['role']);
    
    })
  }

  ngOnInit(): void {
  }


  onGEt(email: string, password: string) {
    this.loginservice.getString().subscribe((data: any) => {
      alert(data)
    }
    )
  }
  onLogin(email: string, password: string) {
    this.loginservice.loginUser(email, password).subscribe((data: any) => {
      console.log(data['auth-token'])
      alert("This is " + email + ' ' + password + data)
    })
  }


}
