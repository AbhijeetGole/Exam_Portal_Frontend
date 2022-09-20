import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uservalue:any = [];
  constructor(private http:HttpClient, private router: Router) { }

  registerUser(user:any){
    this.http.post<any>('http://localhost:7000/exam-portal/user',user).subscribe(res=>{
      console.log(res)
      this.uservalue=res;
      alert("Account Created! Please Login to Continue");
    })
  }

  LoginUser(user:any){
    this.http.post('http://localhost:7000/exam-portal/user/authenticate',user).subscribe(res=>{
    this.uservalue=res;   
    alert(this.uservalue.message) 
    if(this.uservalue.role=='admin'){
      this.router.navigate(['admin']);
    }else if(this.uservalue.role=='user'){
      this.router.navigate(['user']);
    }
    },error=>{
       alert("Incorrrect Email or Password!")
    })
    
  }
  logout(user:any){
    this.http.delete<any>('http://localhost:7000/exam-portal/user/logout',user).subscribe(res=>{
      console.log(res)
     
    })
  }
  Authenticate(user:any){
    this.http.post<any>('http://localhost:7000/exam-portal/token/validate',user).subscribe(res=>{
      console.log(res)
     
    })
  }
  CreateQue(user:any){
    this.http.post<any>('http://localhost:8000/question',user).subscribe(res=>{
      console.log(res)
      alert("Question Added Successfully")
     
    })
  }
  SeeAllQue(){
    this.http.get<any>('http://localhost:8000/question').subscribe(res=>{
      // console.log(typeof res)
      console.log(res)
      return res;
      // this.array=res;
      // console.log(this.array)
    })
  }

}
