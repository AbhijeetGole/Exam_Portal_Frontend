import { Component, OnInit,Injectable } from '@angular/core';
import { Router,CanActivate,CanDeactivate } from '@angular/router';
import { count, interval } from 'rxjs';
import { LocationStrategy } from '@angular/common';
import Swal from 'sweetalert2';
import { ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MaxLengthValidator } from '@angular/forms';

import { UserQuizService } from 'src/app/services/user-quiz.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  public quizList: any = [];
  public options: any = [];
  public option: any = {};
  public questionList: any = [];
  public filteredQuestions: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  public marksGot: number = 0;
  public correctAns: number = 0;
  public inCorrectAns: number = 0;
  isQuizCompleted: boolean = false;
  questionInterval$: any;
  counter = 60;
  progress: number = 0;
  isAnswered: boolean = false;
  count:number=1
  timer: any;
  endTime:any;
  lengthArray: any=[];
  id: any;
  title:any;
  null:string=''
  constructor(private apiService:ApiService  ,private quizService: UserQuizService, private router: Router, 
    private elementRef: ElementRef, private location: LocationStrategy) {
    this.id = localStorage.getItem("id")
    this.title=localStorage.getItem("title")
    this.endTime=localStorage.getItem("endTime")
    history.pushState(null, this.null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, this.null, window.location.href);
    });  
  }
  
  ngOnInit(): void {
    this.getAllQuiz(this.id);
    this.getAllQuestions();
    this.getUser();
    window.addEventListener("beforeunload",function(e){
      var confirmationMessage="\o/";
      console.log("cond");
      e.returnValue=confirmationMessage;
      return confirmationMessage;
    })
    if(localStorage.getItem("id")){
        console.log("success")
    }
    else{
      Swal.fire('warning',"You Have Not Enter Quiz Id",'warning')
      this.router.navigate(['quizUser'])
    }
  }

  submitAns() {
    Swal.fire({
      title: 'Do you want to submit?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: `cancle`,
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.filteredQuestions.forEach((q: any) => {
          if (q.givenAns === q.answer) {
            this.points += 10;
            this.correctAns++;
            this.marksGot += this.points
          }
          else {
            this.inCorrectAns++;
          }
        })
        console.log(this.points)
        this.isQuizCompleted = true;
        // localStorage.clear();
        localStorage.removeItem("id")
      }
    })
  }

  getAllQuiz(id: any) {
    this.quizService.getQuizJson(id).subscribe(res => {
      this.quizList = res
      console.log(this.quizList.length)
      this.questionList.forEach((response: any) => {
        for (let j = 0; j < this.quizList.length; j++) {
          for (let i = 0; i < this.quizList[j].length; i++) {
            if (response._id === this.quizList[j][i]) {
              this.filteredQuestions.push(response)
            }
          }
        }
      })
      this.filteredQuestions.forEach((q: any) => {
        q['givenAns'] = ''
        q['isAnswered'] = false
      })
      console.log(this.filteredQuestions)
      this.timer = this.endTime* 60
      this.lengthArray = this.filteredQuestions
      this.startTimer();

    })
  }

  getAllQuestions() {
    this.quizService.getQuestionJson().subscribe(res => {
      this.questionList = res
    })
  }
  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(t)
        Swal.fire({
          title: 'Time is up',
          confirmButtonText: 'Submit',
          icon: 'info'
        }).then((e) => {
          if (e.isConfirmed) {
            this.filteredQuestions.forEach((q: any) => {

              if (q.givenAns === q.answer) {

                this.points += 10;
                this.correctAns++;
                this.marksGot += this.points

              }
              else {

                this.inCorrectAns++;
              }
            })
            console.log(this.points)
            this.isQuizCompleted = true;
          }

        })

      }
      else {
        this.timer--;
      }
    }, 1000);
  }
  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`
  }
  onItemChange(value: any) {
    console.log(" Value is : ", value);
  }
  answerMarked() {
    if (this.filteredQuestions[this.currentQuestion].givenAns.length === 0) {
      console.log("empty")
    }
    else {
      this.filteredQuestions[this.currentQuestion].isAnswered = true;
      console.log("filled")
    }
  }
  lastAnswerMarked() {

    if (this.filteredQuestions[this.quizList.length - 1].givenAns.length === 0) {
      console.log("empty")


    }
    else {
      this.filteredQuestions[this.currentQuestion].isAnswered = true;
      console.log("filled")
    }
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }

  setCounter() {
    this.counter = 60;
    this.questionInterval$ = interval(1000).subscribe(counter => {
      this.counter--;
      if (this.counter == 0) {
        this.nextQuestion();
        this.counter = 60;
      }

    })

  }

  getProgress() {
    if (this.filteredQuestions[this.currentQuestion].givenAns.length === 0) {
      // console.log("empty")
      
    }
    else {
      this.filteredQuestions[this.currentQuestion].isAnswered = true;
      // console.log("filled")
      this.progress=(100*this.count)/this.filteredQuestions.length
      this.count+=1;
      // this.progress+10
    }
    return this.progress/100;
  }
  userData:any={}
  getUser(){
    this.apiService.getUserInfo().subscribe((res:any)=>{
     
      this.userData=res
      
   })
  }

}
