import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent {

  formdisplay = false;
  showCreateToast = false;
  screenWidth:any;

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

  constructor(private questionService:QuestionService, private router:Router) {
    this.screenWidth = window.innerWidth;
  }
  formDisplay() {
    this.formdisplay = !this.formdisplay;
  }

  createQuestion(data:any):any{
    // console.log(data);
    this.questionService.createNewQuestion(data);
    this.showCreateToast = true;
    setTimeout(()=>{
      location.reload()
    }, 4000);

    // this.router.navigate([this.router.url])
    // this.questionservice.getAllQuestions();
  }
}
