import { Component, OnInit, Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { count, interval } from 'rxjs';
import { LocationStrategy } from '@angular/common';
import Swal from 'sweetalert2';
import { ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MaxLengthValidator } from '@angular/forms';
import { Directive, HostListener } from '@angular/core'
import { UserQuizService } from 'src/app/services/user-quiz.service';
import { ApiService } from 'src/app/services/api.service';
import { ResultService } from 'src/app/services/result.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as confetti from 'canvas-confetti';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})


export class QuizPageComponent implements OnInit {

  resultModel = {
    "userId": "",
    "quizId": "",
    "result": 0,
    "userName": ""
  }
  userData: any = {}
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
  level: any;
  questionInterval$: any;
  counter = 60;
  progress: number = 0;
  isAnswered: boolean = false;
  count: number = 1
  timer: any;
  endTime: any;
  lengthArray: any = [];
  id: any;
  title: any;
  null: string = ''
  uservalue: any;
  constructor(private apiService: ApiService, private quizService: UserQuizService, private router: Router,
    private elementRef: ElementRef, private location: LocationStrategy, private resultService: ResultService,
    private cookie: CookieService, private http: HttpClient,) {
    this.id = localStorage.getItem("id")
    this.title = localStorage.getItem("title")
    this.endTime = localStorage.getItem("endTime")
    history.pushState(null, this.null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, this.null, window.location.href);
    });
  }
  private randomInRange(min: any, max: any) {
    return Math.random() * (max - min) + min;
  }
  ngOnInit(): void {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'jwt': this.cookie.get('jwt')
    });

    this.http.get(environment.userUrl + 'exam-portal/token/validate', { headers: headers, withCredentials: true })
      .subscribe((data: any) => {
        this.uservalue = data

        if (this.uservalue != 'user') {
          // Swal.fire('warning',"You are not LoggedIn",'warning')
          Swal.fire("Alert", "You are not LoggedIn", "warning")
          this.router.navigate([''])


        }
      },(error: any) => {
        Swal.fire("Alert","You are not LoggedIn","warning")
        this.router.navigate([''])
      })
    this.getAllQuiz(this.id);
    this.getAllQuestions();
    this.getUser();
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
      console.log("cond");
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    })
    if (localStorage.getItem("id")) {
      console.log("success")
    }
    else {
      Swal.fire('warning', "You Have Not Enter Quiz Id", 'warning')
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

        try {
          confetti.create(undefined, { resize: true, useWorker: false })({
            angle: this.randomInRange(20, 100),
            shapes: ['square'],
            spread: this.randomInRange(50, 60),
            startVelocity: 80,
            particleCount: this.randomInRange(450, 350),
            ticks: 500,
            origin: {
              x: 0.2,
              y: 0.8
            }
          });
        } catch (e) {
        }
        this.filteredQuestions.forEach((q: any) => {
          this.level = q.difficultyLevel
          if (q.givenAns === q.answer) {
            if (q.difficultyLevel === 'easy') {
              this.points += 5;
            }
            else if (q.difficultyLevel === 'medium') {
              this.points += 7;
            }
            else {
              this.points += 10;
            }
            this.correctAns++;
            this.marksGot += this.points
          }
          else {
            this.inCorrectAns++;
          }
        })
        console.log(this.filteredQuestions)
        // console.log(this.points)
        this.isQuizCompleted = true;
        // localStorage.clear();
        this.resultPage(this.resultModel)
        localStorage.removeItem("id")
      }
    })
  }

  resultPage(resultModel: any) {
    this.resultModel.result = this.points
    this.resultModel.quizId = this.id
    this.resultModel.userId = this.userData._id
    this.resultModel.userName = this.userData.userName
    this.resultService.result(resultModel).subscribe(res => {
      console.log(res)
      // res.result=this.points    
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
      this.timer = this.endTime * 60
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

                if (q.difficultyLevel === 'easy') {
                  this.points += 5;
                }
                else if (q.difficultyLevel === 'medium') {
                  this.points += 7;
                }
                else {
                  this.points += 10;
                }
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
      // console.log("empty")
    }
    else {
      this.filteredQuestions[this.currentQuestion].isAnswered = true;
      // console.log("filled")
    }
  }
  lastAnswerMarked() {

    if (this.filteredQuestions[this.quizList.length - 1].givenAns.length === 0) {
      // console.log("empty")


    }
    else {
      this.filteredQuestions[this.currentQuestion].isAnswered = true;
      // console.log("filled")
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
      this.progress = (100 * this.count) / this.filteredQuestions.length
      this.count += 1;
      // this.progress+10
    }
    return this.progress / 100;
  }

  getUser() {
    this.apiService.getUserInfo().subscribe((res: any) => {

      this.userData = res

    })
  }


}
