import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router } from '@angular/router';
import { CookieService} from 'ngx-cookie-service'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uservalue:any = [];

  constructor(private http:HttpClient, private router: Router,private cookie:CookieService) { }

  registerUser(user:any){
    this.http.post<any>('http://localhost:7000/exam-portal/user',user).subscribe((res:any)=>{
      //console.log(res)
      this.uservalue=res;
      alert("Account Created! Please Login to Continue");
    })
  }

  // { observe: 'response',withCredentials:true, responseType:'text' }

  loginUser(user:any){
    this.http.post('http://localhost:7000/exam-portal/user/authenticate',user).subscribe((res:any)=>{
    this.uservalue = res;   
    this.cookie.set('jwt', res['token'])

    if(this.uservalue.role=='admin'){
      this.router.navigate(['admin']);
    }else if(this.uservalue.role =='user'){
      this.router.navigate(['user']);
    }
    },(error:any) => {
       alert("Incorrrect Email or Password!")
    })
    
  }

  logout(user:any){
    this.http.delete<any>('http://localhost:7000/exam-portal/user/logout', user).subscribe((res: any) => {
      console.log(res);
    })
  }

  Authenticate(){
    this.http.get<any>('http://localhost:7000/exam-portal/token/validate').subscribe((res:any)=>{
      console.log(res);
    })
  }

  CreateQue(user:any){
    this.http.post<any>('http://localhost:8000/question',user).subscribe((res:any)=>{
      console.log(res)
      // alert("Question Added Successfully")
     
    })
  }
  
  SeeAllQue(){
    this.http.get<any>('http://localhost:8000/question').subscribe((res:any)=>{
      // console.log(typeof res)
      console.log(res)
      return res;
      // this.array=res;
      // console.log(this.array)
    })
  }

}
