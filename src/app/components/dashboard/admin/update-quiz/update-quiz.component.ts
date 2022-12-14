import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionGroupDisplayComponent } from '../display-questiongroup/display-questiongroup.component';
import { QuizService } from 'src/app/services/quiz.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  id: any = '';
  questionGroups: any[] = [];
  checked: any[] = [];
  selectAll: boolean = false;
  Quiz: any = {
    title: '',
    description: '',
    duration: '',
  };
  uservalue: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;

  constructor(private questionService: QuestionService, private questionGrpService: QuestionGrpService,
    private router: Router, private quizService: QuizService, private toastr: ToastrService, private route: ActivatedRoute, private http: HttpClient, private cookie: CookieService) { }
    quizGroup=new FormGroup({
      title:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      duration:new FormControl('',[Validators.required]),
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
    this.getQuestionGroups();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getQuizById(this.id);
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

  getQuizById(id: any) {
    this.quizService.getQuizById(id)
      .subscribe(
        (response: any) => {
          this.checked = response.questionGroup;
          this.Quiz.title = response.title;
          this.Quiz.description = response.description;
          this.Quiz.duration = response.endTime;
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  updateQuiz(data: any) {
    let quizUpdate = {
      title: data.title,
      description: data.description,
      startTime: '0',
      endTime: data.duration,
      questionGroup: this.checked
    }
    this.quizService.updateQuizById(this.id, quizUpdate).subscribe((response: any) => {
      this.toastr.success("Quiz Updated Successfully!");
    }, (error) => {
      console.log(error);
    });

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
