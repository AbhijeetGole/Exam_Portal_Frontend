import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router } from '@angular/router';
import { CookieService} from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uservalue:any = [];
  user: any = {};
  constructor(private http:HttpClient, private router: Router,private cookie:CookieService) { }

  registerUser(user:any){
    this.http.post<any>(environment.userUrl+'exam-portal/user',user).subscribe((res:any)=>{
      console.log(res)
      this.uservalue=res;
      alert("Account Created! Please Login to Continue");
    })
  }
  
  LoginUser(user:any){
    this.http.post(environment.userUrl+'exam-portal/user/authenticate',user).subscribe((res:any)=>{
    this.uservalue=res;   
      this.cookie.set('jwt',res.data.token)
      this.user=this.uservalue.role.toString();
     if(this.user=='admin'){
      this.router.navigate(['admin']);
    }else if(this.user=='user'){
      this.router.navigate(['user']);
    }
    },(error:any)=>{
       alert("Required Email or Password!")
    })
    
  }

  logout(user:any){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    this.http.delete<any>(environment.userUrl+'exam-portal/user/logout',{ headers: headers }).subscribe((res:any)=>{
      console.log(res)
     
    })
  }
  Authenticate(){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    this.http.get<any>(environment.userUrl+'exam-portal/token/validate',{ headers: headers }).subscribe((res:any)=>{
      console.log(res);
    })
  }
  CreateQue(user:any){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    this.http.post<any>(environment.apiUrl+'question',{ headers: headers }).subscribe((res:any)=>{
      console.log(res)
    })
  }
  SeeAllQue(){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    this.http.get<any>(environment.apiUrl+'question',{ headers: headers }).subscribe((res:any)=>{
      return res;
    })
  }
  

}
