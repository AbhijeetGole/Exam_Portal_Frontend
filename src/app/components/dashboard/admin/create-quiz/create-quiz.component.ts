import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  questionGroups: any[] = [];
  checked: any[] = [];
  selectAll: boolean = false;
  uservalue:any;
  Quiz: any = {
    title: '',
    description: '',
    duration: '15',
  };

  constructor(private questionService: QuestionService, private questionGrpService: QuestionGrpService, private router: Router, private quizService: QuizService, private cookie:CookieService, private http: HttpClient) { }

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
    this.getQuestionGroups()
  }

  getQuestionGroups() {
    this.questionGrpService.getAllQuestionGroup()
      .subscribe(
        (response: any) => {
          this.questionGroups = response;
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  createQuiz(data: any) {
    let quizPost = {
      title: data.title,
      description: data.description,
      startTime: "0",
      endTime: data.duration,
      questionGroup: this.checked
    }

    this.quizService.createQuiz(quizPost).subscribe((res: any) => {
      console.log('question group created successfully!');
    }, (error: any) => {
      console.log(error.message);
    })

    this.router.navigate(['/quiz']);
  }

  isChecked(id: any) {
    if (this.checked.indexOf(id) == -1) {
      return false;
    }

    return true;
  }

  onCheckChanged(e: any) {

    let index = this.checked.indexOf(e.target.value);

    if (index == -1) {
      this.checked.push(e.target.value);
    } else {
      this.checked.splice(index, 1);
    }

    console.log(this.checked);
  }
}

