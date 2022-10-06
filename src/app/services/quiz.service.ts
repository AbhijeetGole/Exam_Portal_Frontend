import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quiz: any = [];

  constructor(private http: HttpClient) { }

  getAllQuizes() {
    return this.http.get(environment.apiUrl+'quiz/', {withCredentials: true});
  }

  getQuizById(id:any) {
    return this.http.get(environment.apiUrl+'quiz/'+id, {withCredentials: true});
  }

  createQuiz(data:any){
    return this.http.post<any>(environment.apiUrl+'quiz/',data, {withCredentials: true})
  }
  
  updateQuizById(id: any, data: any) {
    return this.http.put(environment.apiUrl+'quiz/' + id, data, {withCredentials: true});
  }
  
  deleteQuizById(id: any) {
    return this.http.delete<any>(environment.apiUrl+'quiz/' + id, {withCredentials: true});
  }
}