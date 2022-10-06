import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { UserQuizService } from 'src/app/services/user-quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  quiz:any={};
  IDModel={
    id:''
  }
  constructor(private http:HttpClient,private quizService:UserQuizService,private router:Router) { 
    console.log(this.IDModel)
  }

  ngOnInit(): void {
  }
  getId(id:any){
    // console.log(id.id)
    localStorage.setItem("id",id.id)
    this.quizService.getQuizJson(id.id).subscribe(res=>{
      // console.log(res)
      this.router.navigate(['quizPage'])
    })
    this.quizService.getQuizById(id.id).subscribe(res=>{
      // console.log(res)
      this.quiz=res
      // console.log(this.quiz.title)
      // console.log(this.quiz.endTime)
      localStorage.setItem("title",this.quiz.title)
      localStorage.setItem("endTime",this.quiz.endTime)
    })
  }
  // getQuizById(id:any){
    
  // }

}
