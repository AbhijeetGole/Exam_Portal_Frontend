import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionDisplayComponent } from '../display-questions/display-questions.component';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-createquestion',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {

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

  constructor(private questionService: QuestionService, private toastr:ToastrService, private router: Router, private http: HttpClient, private display: QuestionDisplayComponent, private cookie: CookieService) {
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
          Swal.fire("Alert","You are not LoggedIn","warning")
          this.router.navigate([''])
        }

      }, (error: any) => {
        Swal.fire("Alert","You are not LoggedIn","warning")
        this.router.navigate([''])
      })
  }

  formDisplay() {
    this.formdisplay = !this.formdisplay;
  }

  createQuestion(data: any): any {
    // this.showCreateToast = false;
    this.questionService.createNewQuestion(data).subscribe((data: any) => {
      // this.showCreateToast = true;
      this.toastr.success("Question Created Successfully!")
      this.formdisplay = !this.formdisplay;
      this.display.getQuestions();
      this.userEmails.reset();
    })
  }
}
