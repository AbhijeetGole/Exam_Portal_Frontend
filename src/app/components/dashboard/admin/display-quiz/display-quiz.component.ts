import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { QuestionSharingService } from 'src/app/services/question-sharing.service';
import { QuizService } from 'src/app/services/quiz.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.css']
})
export class DisplayQuizComponent implements OnInit {

  quizzes: any[] = [];
  que: any = {};
  screenWidth: any;
  deleteQueId: any;
  showUpdateToast = false;
  showDeleteToast = false;
  uservalue: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;

  constructor(private quizService: QuizService, private apiSerive: ApiService,
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

      this.getQuizzes();
  }

  getQuizzes() {
    this.quizService.getAllQuizes()
      .subscribe(
        (response: any) => {
          console.log('response received');
          console.log(response);
          this.quizzes = response;
          localStorage.setItem("quizzes",this.quizzes[0]['title'])
        },
        (error: any) => {
          console.error('Request failed with error' + error.message);
        }
      )
  }

  createQuiz() {
    this.router.navigate(['quiz/createquiz']);
  }

  updateQuiz(id: any){
    this.router.navigate(['quiz/updatequiz', id]);
  }

  deleteQuizById(id: any) {
    console.log(id);
    this.showDeleteToast = false;
    this.quizService.deleteQuizById(id).subscribe((res: any) => {
      console.log(res)
      this.showDeleteToast = true;
      this.getQuizzes();
    })
  }

  // updateQuestionGroup(id: any, data: any) {
  //   this.showUpdateToast = false;
  //   this.questionGrpService.updateQuestionGroup(id, data).subscribe((data: any) => {
  //     this.showUpdateToast = true;
  //     this.getQuestionGroup();
  //   });
  // }

  getQuizById(id: any) {
    this.quizService.getQuizById(id)
      .subscribe(
        (response: any) => {
          this.que = response;
          console.log("clicked")
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  // ClipBoardCopy() {
  //   this.clipboardApi.
  // }

  onTableDataChange(event: any) {
    this.page = event;
    this.getQuizzes();
  }

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getQuizzes();
  }
}
