import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuestionGrpService {
  questionGrp : any = []
  baseUrl: string = 'http://localhost:8000/question-group'
  constructor(private http:HttpClient, private router:Router) { }

  getAllQuestionGrp() {
    return this.http.get(this.baseUrl)
  }

  getQuestionGrpbyId(id:any) {
    return this.http.get('http://localhost:8000/question-grp/'+id);
  }

  createNewQuestionGrp(data:any){
    this.http.post<any>('http://localhost:8000/question-group',data).subscribe((res:any)=>{
      console.log(res)
      this.questionGrp=res;
    })
  }
}
