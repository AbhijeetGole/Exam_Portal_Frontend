import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent implements OnInit {
  questions: any[] = [];
  que: any = {};
  screenWidth: any;
  showUpdateToast = false;
  showDeleteToast = false;
  constructor(private questionService: QuestionService, private apiSerive: ApiService,private http:HttpClient,private router:Router) {
    this.screenWidth = window.innerWidth;
  }

  getQuestions() {
    this.questionService.getAllQuestions()
      .subscribe(
        (response: any) => {
          console.log('response received');
          this.questions = response;
        },
        (error) => {
          console.error('Request failed with error' + error);
        }
      )
  }
  //  uservalue:any;
  ngOnInit(): void {
    // console.log("Piytush")
    // this.http.get("http://localhost:7000/exam-portal/token/validate",{ observe: 'response', withCredentials:true,responseType:'text'})

    // .subscribe((data:any)=>{
    //   this.uservalue=data;
    //   console.log(this.uservalue)
    //   if(this.uservalue.body!="admin"){
    //        this.router.navigate([''])
    //   }

    // })
    this.getQuestions();
  }

  show(id: any) {
    console.log(id)
  }

  deleteQuestion(id: any) {
    if (confirm("Confirm Deletion?")) {
      this.questionService.deleteQuestion(id).subscribe(res => {
        console.log(res)
        this.showDeleteToast = true;
      setTimeout(() => {
        location.reload()
      }, 4000);
      })
    }
    else {
      console.log("cancelled")
    }
  }

  updateQuestion(id: any, data: any) {
    this.questionService.updateQuestion(id, data).subscribe((data) => {
      console.log('Updated Successfully!');
      this.showUpdateToast = true;
      setTimeout(() => {
        location.reload()
      }, 4000);

    });
  }

  getQuestionById(id: any) {
    this.questionService.getQuestionbyId(id)
      .subscribe(
        (response: any) => {
          // console.log('response received');
          this.que = response;
          console.log(this.que);
        },
        (error) => {
          console.error('Request failed with error' + error);
        }
      )
  }

}