import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserQuizService {

  constructor(private http:HttpClient,private cookie:CookieService) { }
  getQuizJson(id:any){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.get(environment.apiUrl+'quiz/getQuestionFromQuiz/'+id, {headers: headers, withCredentials: true});
  }
  getQuestionJson(){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.get(environment.apiUrl+'question', {headers: headers, withCredentials: true});
    // return this.http.get("http://localhost:4001/question")
  }
  getQuizById(id:any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.get(environment.apiUrl+'quiz/'+id, {headers: headers, withCredentials: true});
  }

}
