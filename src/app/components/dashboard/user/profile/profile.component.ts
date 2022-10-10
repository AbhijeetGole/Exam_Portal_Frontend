import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = {}
  constructor(private cookie: CookieService, private router: Router, private http: HttpClient, private apiService: ApiService) { }
  uservalue: any;
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
          Swal.fire("Alert", "You are not LoggedIn", "warning")
          this.router.navigate([''])


        }
      },(error: any) => {
        Swal.fire("Alert","You are not LoggedIn","warning")
        this.router.navigate([''])
      })
    this.getUser();
  }
  getUser() {
    this.apiService.getUserInfo().subscribe((res: any) => {

      this.userData = res

    })
  }
}
