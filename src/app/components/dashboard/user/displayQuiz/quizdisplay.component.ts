import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quizdisplay',
  templateUrl: './quizdisplay.component.html',
  styleUrls: ['./quizdisplay.component.css']
})
export class QuizdisplayComponent implements OnInit {

  constructor(private cookie:CookieService, private router:Router,private http:HttpClient) { }
 uservalue:any
  ngOnInit(): void {
    this.http.get(environment.userUrl+"exam-portal/token/validate",{ observe: 'response', withCredentials:true,responseType:'text'})

    .subscribe((data:any)=>{
    this.uservalue=data
    if(this.uservalue.body!="user")
     {
      alert("You are not LoggedIn")
      this.router.navigate([''])
     }

    },(error:any)=>{
      alert("You are not LoggedIn")
      this.router.navigate([''])
    })
  }

  logout() {
    this.cookie.delete('jwt');
    this.router.navigate(['']);
  }

}
