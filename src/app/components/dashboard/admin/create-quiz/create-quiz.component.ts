import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  questionGroups: any[] = [];
  checked: any[] = [];
  selectAll: boolean = false;
  uservalue: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  showCreateToast=false;
  Quiz: any = {
    title: '',
    description: '',
    duration: '15',
  };
  screenWidth: any;

  constructor(private questionService: QuestionService, private toastr: ToastrService, private questionGrpService: QuestionGrpService, private router: Router, private quizService: QuizService, private cookie: CookieService, private http: HttpClient) { this.screenWidth = window.innerWidth; }
  quizGroup=new FormGroup({
    title:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    duration:new FormControl('',[Validators.required])
  })
  get TITLE():FormControl{
    return this.quizGroup.get('title') as FormControl
  }
  get DESCRIPTION():FormControl{
    return this.quizGroup.get('description') as FormControl
  }
  get DURATION():FormControl{
    return this.quizGroup.get('duration') as FormControl
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
    this.getQuestionGroups()

    if (this.screenWidth < 378) {
      this.tableSize = 3;
    }
    if (this.screenWidth > 378 && this.screenWidth < 480) {
      this.tableSize = 4;
    }
    if (this.screenWidth < 1400 && this.screenWidth > 480) {
      this.tableSize = 6;
    }
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
    // this.showCreateToast=false;
    this.quizService.createQuiz(quizPost).subscribe((res: any) => {
      //  this.showCreateToast=true;
      this.toastr.success("Quiz created successfully!");
      console.log('quiz created successfully!');
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

  onSelectAll() {
    this.selectAll = !this.selectAll;
    if (!this.selectAll) {
      this.checked = [];
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getQuestionGroups();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getQuestionGroups();
  }
}

