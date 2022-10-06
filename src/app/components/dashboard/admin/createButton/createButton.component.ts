import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionDisplayComponent } from '../displayQuestions/question-display.component';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-createbtn',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.css']
})
export class CreatebuttonComponent {

  userEmails = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z].*")]),
    type: new FormControl('', [Validators.required]),
    option1: new FormControl('', [Validators.required]),
    option2: new FormControl('', [Validators.required]),
    option3: new FormControl('', [Validators.required]),
    option4: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
    difficultyLevel: new FormControl('', [Validators.required]),

  });

  get TITLE(): FormControl {
    return this.userEmails.get('title') as FormControl
  }
  get TYPE(): FormControl {
    return this.userEmails.get('type') as FormControl
  }
  get OPTION1(): FormControl {
    return this.userEmails.get('option1') as FormControl
  }

  get OPTION2(): FormControl {
    return this.userEmails.get('option2') as FormControl
  }
  get OPTION3(): FormControl {
    return this.userEmails.get('option3') as FormControl
  }
  get OPTION4(): FormControl {
    return this.userEmails.get('option4') as FormControl
  }
  get ANSWER(): FormControl {
    return this.userEmails.get('answer') as FormControl
  }
  get DIFFICULTYLEVEL(): FormControl {
    return this.userEmails.get('difficultyLevel') as FormControl
  }

  formdisplay = false;
  showCreateToast = false;
  screenWidth: any;

  questions: any[] = [];
  Question: any = {
    _id: '',
    title: '',
    type: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    difficultyLevel: ''
  }

  constructor(private questionService: QuestionService, private router: Router, private http: HttpClient, private display: QuestionDisplayComponent, private cookie: CookieService) {
    this.screenWidth = window.innerWidth;
  }

  uservalue: any;
  ngOnInit(): void {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'jwt': this.cookie.get('jwt')

    });
    this.http.get(environment.apiUrl+"exam-portal/token/validate", { headers: headers, withCredentials: true })

      .subscribe((data: any) => {
        this.uservalue = data

        if (this.uservalue != 'admin') {
          alert("You are not LoggedIn")
          this.router.navigate([''])
        }

      }, (error: any) => {
        alert("You are not LoggedIn")
        this.router.navigate([''])
      })
  }

  formDisplay() {
    this.formdisplay = !this.formdisplay;
  }

  createQuestion(data: any): any {
    this.showCreateToast = false;
    this.questionService.createNewQuestion(data).subscribe((data: any) => {
      this.showCreateToast = true;
      this.formdisplay = !this.formdisplay;
      this.display.getQuestions();
    })
  }
}
