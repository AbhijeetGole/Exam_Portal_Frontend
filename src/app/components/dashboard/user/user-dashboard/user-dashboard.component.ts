
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserQuizService } from '../../../../services/user-quiz.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  quiz: any = {};
  uservalue: any;
  IDModel = {
    id: ''
  }
  constructor(private http: HttpClient, private quizService: UserQuizService, private router: Router,
    private cookie: CookieService) {
    console.log(this.IDModel)
  }
  userQuiz = new FormGroup({
    id: new FormControl('', [Validators.required])
  })
  get ID(): FormControl {
    return this.userQuiz.get('id') as FormControl
  }
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
  }
  getId(id: any) {
    localStorage.setItem("id", id.id)
    this.quizService.getQuizJson(id.id).subscribe(res => {
      this.router.navigate(['quizPage'])
    })
    this.quizService.getQuizById(id.id).subscribe(res => {
      this.quiz = res
      localStorage.setItem("title", this.quiz.title)
      localStorage.setItem("endTime", this.quiz.endTime)
    })
  }
}
