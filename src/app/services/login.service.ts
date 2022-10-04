import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService} from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private cookie:CookieService) { }

  public generateToken(loginData:any){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return this.http.post(environment.userUrl+'exam-portal/user/authenticate',loginData, { headers: headers })
  }
}
