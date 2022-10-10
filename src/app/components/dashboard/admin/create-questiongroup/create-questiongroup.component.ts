import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-createquestiongroup',
  templateUrl: './create-questiongroup.component.html',
  styleUrls: ['./create-questiongroup.component.css']
})
export class CreateQueGrpComponent implements OnInit {

  questions: any[] = [];
  filteredQuestions: any[] = [];
  checked: any[] = [];
  selectAll: boolean = false;
  screenWidth:any;
  uservalue: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  showCreateToast=false;
  QuestionGroup: any = {
    name: '',
    topic: '',
  };

  constructor(private questionService: QuestionService, private http: HttpClient,
     private questionGrpService: QuestionGrpService, private router: Router, 
     private cookie: CookieService, private toastr:ToastrService) 
  { this.screenWidth = window.innerWidth; }
  questionGroup=new FormGroup({
    title:new FormControl('',[Validators.required]),
    topic:new FormControl('',[Validators.required])
  })
  get TITLE():FormControl{
    return this.questionGroup.get('title') as FormControl
  }
  get TOPIC():FormControl{
    return this.questionGroup.get('topic') as FormControl
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
    this.getQuestions()

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
    this.questionGrpService.createNewQuestionGroup(questionGroupPost).subscribe((res: any) => {
      this.toastr.success("Question Group Created!")
      // console.log('question group created successfully!'); 
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
    console.log(this.checked)
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

  onTableDataChange(event: any) {
    this.page = event;
    this.getQuestions();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getQuestions();
  }
}
