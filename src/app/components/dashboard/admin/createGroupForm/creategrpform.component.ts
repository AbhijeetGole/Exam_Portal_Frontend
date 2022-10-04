import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-creategrpform',
  templateUrl: './creategrpform.component.html',
  styleUrls: ['./creategrpform.component.css']
})
export class CreategrpformComponent implements OnInit {

  questions: any[] = [];
  filteredQuestions: any[] = [];
  checked: any[] = [];
  selectAll: boolean = false;
  uservalue: any;
  QuestionGroup: any = {
    name: '',
    topic: '',
  };

  constructor(private questionService: QuestionService, private http: HttpClient, private questionGrpService: QuestionGrpService, private router: Router, private cookie: CookieService) { }//, private questionGroupDisplay: QuestionGroupDisplayComponent) { }

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
    this.getQuestions()
  }

  getQuestions() {
    this.questionService.getAllQuestions()
      .subscribe(
        (response: any) => {
          this.questions = response;
          this.filteredQuestions = response;
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  createQuestionGroup(data: any) {
    console.log(data);
    let questionGroupPost = {
      title: data.title,
      topic: data.topic,
      questionID: this.checked
    }
    
    console.log(questionGroupPost);
    this.questionGrpService.createNewQuestionGroup(questionGroupPost).subscribe((res: any) => {
      console.log('question group created successfully!');
    }, (error: any) => {
      console.log(error.message);
    })

    this.router.navigate(['/question-group']);
  }

  isChecked(id: any) {
    if (this.selectAll) {

      this.checked = [];
      this.filteredQuestions.forEach(question => {
        this.checked.push(question._id);
      });
      return true;
    }
    if (this.checked.indexOf(id) == -1) {
      return false;
    }
    return true;
  }

  onCheckChanged(e: any) {

    let index = this.checked.indexOf(e.target.value);
    this.selectAll = false;

    if (index == -1) {
      this.checked.push(e.target.value);
    } else {
      this.checked.splice(index, 1);
    }
  }

  onSelectAll() {
    this.selectAll = !this.selectAll;
    if (!this.selectAll) {
      this.checked = [];
    }
  }

  getQuestionByTopic(data: any) {
    this.filteredQuestions = [];
    if (data === 'All') {
      this.filteredQuestions = this.questions;
    } else {
      this.questions.forEach(question => {
        if (question.type === data) {
          this.filteredQuestions.push(question);
        }
      });
    }
  }


}
