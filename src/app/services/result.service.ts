import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http:HttpClient,private cookie:CookieService) { }
  
  result(data:any){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
   return this.http.post(environment.apiUrl+'result/result',data,{headers:headers})
  }
  getAllResult(){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
   return this.http.get(environment.apiUrl+'result/result',{headers:headers})
  }
}
