import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionGrpService {
  questionGrp : any = []
  
  constructor(private http:HttpClient, private router:Router) { }

  getAllQuestionGroup() {
    return this.http.get(environment.apiUrl+'question-group/', {withCredentials: true})
  }

  getQuestionGroupbyId(id:any) {
    return this.http.get(environment.apiUrl+'question-group/'+id, {withCredentials: true});
  }

  createNewQuestionGroup(data:any){
    console.log(data);
    return this.http.post<any>(environment.apiUrl+'question-group/',data, {withCredentials: true})
  }
  
  updateQuestionGroup(id: any, data: any) {
    return this.http.put(environment.apiUrl+'question-group/' + id, data, {withCredentials: true});
  }
  
  deleteQuestionGroup(id: any) {
    return this.http.delete<any>(environment.apiUrl+'question-group/' + id, {withCredentials: true});
  }
}
