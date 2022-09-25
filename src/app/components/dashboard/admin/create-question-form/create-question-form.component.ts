import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
// import { QuestionDisplayComponent } from '../question-display/question-display.component';

@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent {

  formdisplay = false;
  showCreateToast = false;
  screenWidth:any;

  questions: any[] = [];
  Question:any = {
    _id:'',
    title: '',
    type: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    difficultyLevel: ''
  }

  constructor(private questionService:QuestionService, private router:Router, private http:HttpClient) {
    this.screenWidth = window.innerWidth;
  }

  uservalue:any;
  ngOnInit(): void {
    this.http.get("http://localhost:7000/exam-portal/token/validate",{ observe: 'response', withCredentials:true,responseType:'text'})

    .subscribe((data:any)=>{
    this.uservalue=data
    if(this.uservalue.body!="admin")
     {
      alert("You are not LoggedIn")
      this.router.navigate([''])
     }

    },(error:any)=>{
      alert("You are not LoggedIn")
      this.router.navigate([''])
    })
    
  }

  formDisplay() {
    this.formdisplay = !this.formdisplay;
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

  createQuestion(data:any):any{
    this.questionService.createNewQuestion(data);
    this.showCreateToast = true;
    this.getQuestions();
    // QuestionDisplayComponent.getQuestions();
    // this.router.navigate([this.router.url])
    // this.questionService.getAllQuestions();
  }
}
