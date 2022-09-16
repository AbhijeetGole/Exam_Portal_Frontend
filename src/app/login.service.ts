import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient:HttpClient) { }
   getString( ){
    return this.httpClient.get("http://localhost:2002/exam-portal/user/second", { responseType: 'text'})
   }  

   loginUser(email:string,password:string)
   {
    return this.httpClient.post("http://localhost:2002/exam-portal/user/authenticate", { 
      "userName":email,
      "password":password })
   }
   
}


