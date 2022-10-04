import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService} from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  question: any = [];

  constructor(private http: HttpClient, private router: Router,private cookie:CookieService) { }

  getAllQuestions() {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.get(environment.apiUrl+'question', {withCredentials: true});
  }

  getQuestionbyId(id: any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.get(environment.apiUrl+'question/' + id,{ headers: headers , withCredentials: true});
  }

  createNewQuestion(data: any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt').toString()

    });
    return this.http.post<any>(environment.apiUrl+'question', data, { headers: headers , withCredentials: true});
  }

  deleteQuestion(id: any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.delete<any>(environment.apiUrl+'question/' + id,{ headers: headers, withCredentials: true});
  }

  updateQuestion(id: any, data: any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.put(environment.apiUrl+'question/' + id,data,{ headers: headers , withCredentials: true});
  }
}
