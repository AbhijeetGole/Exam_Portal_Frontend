import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-quizdisplay',
  templateUrl: './quizdisplay.component.html',
  styleUrls: ['./quizdisplay.component.css']
})
export class QuizdisplayComponent implements OnInit {

  constructor(private cookie:CookieService, private router:Router,private http:HttpClient,private apiService:ApiService) { }
 uservalue:any
  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'jwt': this.cookie.get('jwt')
    });

    this.http.get(environment.userUrl + 'exam-portal/token/validate', { headers: headers, withCredentials: true })
      .subscribe((data: any) => {
        this.uservalue = data
        
        if (this.uservalue != 'user') {
          // Swal.fire('warning',"You are not LoggedIn",'warning')
          alert("You are not LoggedIn")
          this.router.navigate([''])
          
         
        }
      })
      this.getUser();
  }

  logout() {
    this.cookie.delete('jwt');
    this.router.navigate(['']);
  }
  userData:any={}
  getUser(){
    this.apiService.getUserInfo().subscribe((res:any)=>{
      
      this.userData=res
      
   })
  }
}
