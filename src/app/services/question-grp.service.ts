import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService} from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionGrpService {
  questionGrp : any = []
  
  constructor(private http:HttpClient, private router:Router, private cookie:CookieService) { }

  getAllQuestionGroup() {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.get(environment.apiUrl+'question-group/', {headers: headers,withCredentials: true})
  }

  getQuestionGroupbyId(id:any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.get(environment.apiUrl+'question-group/'+id, {headers: headers,withCredentials: true});
  }

  createNewQuestionGroup(data:any){
    console.log(data);
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });

    console.log(this.cookie.get('jwt'));
    return this.http.post<any>(environment.apiUrl+'question-group',data, {headers: headers, withCredentials: true})
  }
  
  updateQuestionGroup(id: any, data: any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.put(environment.apiUrl+'question-group/' + id, data, {headers: headers,withCredentials: true});
  }
  
  deleteQuestionGroup(id: any) {
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.delete<any>(environment.apiUrl+'question-group/' + id, {headers: headers,withCredentials: true});
  }
}
