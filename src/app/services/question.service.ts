import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  question: any = [];

  constructor(private http: HttpClient, private router: Router) { }

  getAllQuestions() {
    return this.http.get(environment.apiUrl+'question', {withCredentials: true});
  }

  getQuestionbyId(id: any) {
    return this.http.get(environment.apiUrl+'question/' + id, {withCredentials: true});
  }

  createNewQuestion(data: any) {
    return this.http.post<any>(environment.apiUrl+'question', data, {withCredentials: true})
  }

  deleteQuestion(id: any) {
    return this.http.delete<any>(environment.apiUrl+'question/' + id, {withCredentials: true});
  }

  updateQuestion(id: any, data: any) {
    return this.http.put(environment.apiUrl+'question/' + id, data, {withCredentials: true});
  }
}
