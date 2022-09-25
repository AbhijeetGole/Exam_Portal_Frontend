import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent implements OnInit {
  questions: any[] = [];
  que: any = {};
  screenWidth: any;
  showUpdateToast = false;
  showDeleteToast = false;
  uservalue: any;

  constructor(private questionService: QuestionService, private apiSerive: ApiService, private http: HttpClient, private router: Router) {
    this.screenWidth = window.innerWidth;
  }

  getQuestions() {
    this.questionService.getAllQuestions()
      .subscribe(
        (response: any) => {
          console.log('response received');
          this.questions = response;
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  ngOnInit(): void {
    this.http.get("http://localhost:7000/exam-portal/token/validate", { observe: 'response', withCredentials: true, responseType: 'text' })

      .subscribe((data: any) => {
        this.uservalue = data
        if (this.uservalue.body != "admin") {
          alert("You are not LoggedIn")
          this.router.navigate([''])
        }
      })
      
    this.getQuestions();
  }

  show(id: any) {
    console.log(id)
  }

  deleteQuestion(id: any) {
    if (confirm("Confirm Deletion?")) {
      this.questionService.deleteQuestion(id).subscribe((res: any) => {
        console.log(res)
        this.showDeleteToast = true;
        this.getQuestions();
      })
    }
    else {
      console.log("cancelled")
    }
  }

  updateQuestion(id: any, data: any) {
    this.questionService.updateQuestion(id, data).subscribe((data: any) => {
      console.log('Updated Successfully!');
      this.showUpdateToast = true;
      this.getQuestions();
    });
  }

  getQuestionById(id: any) {
    this.questionService.getQuestionbyId(id)
      .subscribe(
        (response: any) => {
          this.que = response;
          console.log(this.que);
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }
}