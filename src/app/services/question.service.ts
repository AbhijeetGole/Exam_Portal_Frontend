import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  question: any = [];
  baseUrl: string = 'http://localhost:8000/question'

  constructor(private http:HttpClient, private router: Router) { }

  getAllQuestions(){
    return this.http.get(this.baseUrl);
  }

  getQuestionbyId(id:any) {
    return this.http.get('http://localhost:8000/question/'+id);
  }

  createNewQuestion(data:any){
    this.http.post<any>('http://localhost:8000/question',data).subscribe(res=>{
      console.log(res)
      this.question=res;
      //alert("Question Created!");
    })
  }

  deleteQuestion(id:any){
    return this.http.delete<any>('http://localhost:8000/question/'+id);
  }

  updateQuestion(id: any, data:any){
    return this.http.put('http://localhost:8000/question/'+id, data);
  }
}
