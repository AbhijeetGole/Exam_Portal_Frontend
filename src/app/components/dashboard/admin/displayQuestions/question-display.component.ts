import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { QuestionSharingService } from '../../../../services/question-sharing.service';
// import { SessionStorage, LocalStorage } from 'angular-web-storage'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})

export class QuestionDisplayComponent implements OnInit {

  questions: any[] = [];
  que: any = {};
  screenWidth: any;
  deleteQueId: any;
  showUpdateToast = false;
  showDeleteToast =false;
  uservalue: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;

  constructor(private questionService: QuestionService, private apiSerive: ApiService,
    private http: HttpClient, private router: Router, private cookie: CookieService,
    private questionSharingService: QuestionSharingService) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.http.get(environment.userUrl+"exam-portal/token/validate", { observe: 'response', withCredentials: true, responseType: 'text' })

      .subscribe((data: any) => {
        this.uservalue = data
        if (this.uservalue.body != "admin") {
          alert("You are not LoggedIn")
          this.router.navigate([''])
        }
      })

    this.getQuestions();
  }

  getQuestions() {
    // console.log('called');
    this.questionService.getAllQuestions()
      .subscribe(
        (response: any) => {
          this.questions = response;
          // localStorage.setItem("questions", JSON.stringify(this.questions))
          // this.questionSharingService.setQuestions(response);
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
    )
  }

  show(id: any) {
    // console.log(id)
  }

  deleteQuestion(id: any) {
    // console.log(id);
    this.showDeleteToast = false;
    this.questionService.deleteQuestion(id).subscribe((res: any) => {
      // console.log(res)
      this.showDeleteToast = true;
      this.getQuestions();
    })
  }

  updateQuestion(id: any, data: any) {
    this.showUpdateToast = false;
    this.questionService.updateQuestion(id, data).subscribe((data: any) => {
      this.showUpdateToast = true;
      this.getQuestions();
    });
  }

  getQuestionById(id: any) {
    this.questionService.getQuestionbyId(id)
      .subscribe(
        (response: any) => {
          this.que = response;
          // console.log("clicked")
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  logout() {
    this.cookie.delete('jwt');
    this.router.navigate(['']);
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getQuestions();
  }

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getQuestions();
  }
}