import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quiz: any = [];

  constructor(private http: HttpClient, private cookie:CookieService) { }

  getAllQuizes() {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.get(environment.apiUrl+'quiz/', {withCredentials: true});
  }

  getQuizById(id:any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.get(environment.apiUrl+'quiz/'+id, {withCredentials: true});
  }

  createQuiz(data:any){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.post<any>(environment.apiUrl+'quiz/',data, {withCredentials: true})
  }
  
  updateQuizById(id: any, data: any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.put(environment.apiUrl+'quiz/' + id, data, {withCredentials: true});
  }
  
  deleteQuizById(id: any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.delete<any>(environment.apiUrl+'quiz/' + id, {withCredentials: true});
  }
}