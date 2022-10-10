import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { QuestionService } from 'src/app/services/question.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { UpdateDeletedQuestionService } from 'src/app/services/update-deleted-question.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.css']
})

export class QuestionDisplayComponent implements OnInit {
  user: any = {};
  questions: any[] = [];
  que: any = {};
  screenWidth: any;
  deleteQueId: any;
  showUpdateToast = false;
  showDeleteToast = false;
  uservalue: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  constructor(private questionService: QuestionService, private apiSerive: ApiService, private toastr: ToastrService,
    private http: HttpClient, private router: Router, private cookie: CookieService,
    private updateDeletedQuestionService: UpdateDeletedQuestionService) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'jwt': this.cookie.get('jwt')
    });

    this.http.get(environment.userUrl + 'exam-portal/token/validate', { headers: headers, withCredentials: true })
      .subscribe((data: any) => {
        this.uservalue = data
        if (this.uservalue != 'admin') {
          Swal.fire("Alert","You are not LoggedIn","warning")
          this.router.navigate([''])
        }
      },(error: any) => {
        Swal.fire("Alert","You are not LoggedIn","warning")
        this.router.navigate([''])
      })

    this.getQuestions();

    if(this.screenWidth<378){
      this.tableSize = 3;
    }
    if(this.screenWidth>378 && this.screenWidth<480){
      this.tableSize = 4;
    }
    if(this.screenWidth>480){
      this.tableSize = 6;
    }
  }

  getQuestions() {
    this.questionService.getAllQuestions()
      .subscribe(
        (response: any) => {
          this.questions = response;
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  deleteQuestion(id: any) {
    // this.showDeleteToast = false;
    this.questionService.deleteQuestion(id).subscribe((res: any) => {
      this.toastr.error("Question Group Deleted!");
      this.updateDeletedQuestionService.setDeletedQuestionId(id)
      // this.showDeleteToast = true;
      this.getQuestions();
    })
  }

  updateQuestion(id: any, data: any) {
    // this.showUpdateToast = false;
    this.questionService.updateQuestion(id, data).subscribe((data: any) => {
      this.toastr.success("Question Group Updated!");
      // this.showUpdateToast = true;
      this.getQuestions();
    });
  }

  getQuestionById(id: any) {
    this.questionService.getQuestionbyId(id)
      .subscribe(
        (response: any) => {
          this.que = response;
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getQuestions();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getQuestions();
  }
}