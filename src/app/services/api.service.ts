import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router } from '@angular/router';
import { CookieService} from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uservalue:any = [];
  constructor(private http:HttpClient, private router: Router,private cookie:CookieService) { }

  registerUser(user:any){
    this.http.post<any>(environment.userUrl+'exam-portal/user',user).subscribe((res:any)=>{
      console.log(res)
      this.uservalue=res;
      alert("Account Created! Please Login to Continue");
    })
  }

  // { observe: 'response',withCredentials:true, responseType:'text' }

  LoginUser(user:any){
    this.http.post(environment.userUrl+'exam-portal/user/authenticate',user).subscribe((res:any)=>{
    this.uservalue=res;   
    // alert(this.uservalue.message) 
    //console.log(res['token'])
    this.cookie.set('jwt',res['token'])

    if(this.uservalue.role=='admin'){
      this.router.navigate(['admin']);
    }else if(this.uservalue.role=='user'){
      this.router.navigate(['user']);
    }
    },(error:any)=>{
       alert("Required Email or Password!")
    })
    
  }
  logout(user:any){
    this.http.delete<any>(environment.userUrl+'exam-portal/user/logout',user).subscribe((res:any)=>{
      console.log(res)
     
    })
  }
  Authenticate(){
    this.http.get<any>(environment.userUrl+'exam-portal/token/validate').subscribe((res:any)=>{
      console.log(res);
    })
  }
  CreateQue(user:any){
    this.http.post<any>(environment.apiUrl+'question',user).subscribe((res:any)=>{
      console.log(res)
      // alert("Question Added Successfully")
     
    })
  }
  SeeAllQue(){
    this.http.get<any>(environment.apiUrl+'question').subscribe((res:any)=>{
      // console.log(typeof res)
      console.log(res)
      return res;
      // this.array=res;
      // console.log(this.array)
    })
  }
  

}
