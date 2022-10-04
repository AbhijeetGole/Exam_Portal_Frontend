import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { QuestionSharingService } from 'src/app/services/question-sharing.service';
import { QuizService } from 'src/app/services/quiz.service';
import { environment } from 'src/environments/environment';
import { UpdateDeletedQuestionGroupService } from 'src/app/services/update-deleted-question-group.service';

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
    private questionSharingService: QuestionSharingService, 
    private updateDeletedQuestionGroupService: UpdateDeletedQuestionGroupService) { 
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
          alert("You are not LoggedIn")
          this.router.navigate([''])
        }
      })

      this.getQuizzes();

      this.updateDeletedQuestionGroupService.selectedId.subscribe((id: any) => {
        if(id != ''){
          this.updateQuizWithId(id);
        }
      }, (error: any) => {
        console.log(error.message);
      })

      if(this.screenWidth<378){
        this.tableSize = 4;
      }
      if(this.screenWidth>378 && this.screenWidth<480){
        this.tableSize = 6;
      }
      if(this.screenWidth>480){
        this.tableSize = 7;
      }
  }

  getQuizzes() {
    this.quizService.getAllQuizes()
      .subscribe(
        (response: any) => {
          console.log('response received');
          console.log(response);
          this.quizzes = response;
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
    this.showDeleteToast = false;
    this.quizService.deleteQuizById(id).subscribe((res: any) => {
      console.log(res)
      this.showDeleteToast = true;
      this.getQuizzes();
    })
  }
  
  updateQuizWithId(id: any){
    this.quizzes.forEach(quiz => {
      let index = quiz.questionGroup.indexOf(id);

      if(index != -1){
        quiz.questionGroup.splice(index, 1);
        
        let quizUpdate = {
          title: quiz.title,
          description: quiz.topic,
          questionGroup: quiz.questionGroup
        }

        this.quizService.updateQuizById(quiz._id, quizUpdate).subscribe((response: any) => {
          this.updateDeletedQuestionGroupService.setDeletedQuestionGroupId('');
        }, (error: any) => {
          console.log(error.message);
        })
      }
    })
  }

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

  onTableDataChange(event: any) {
    this.page = event;
    this.getQuizzes();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getQuizzes();
  }
}
