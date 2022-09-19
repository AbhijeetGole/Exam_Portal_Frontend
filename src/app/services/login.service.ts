import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public generateToken(loginData:any){
    return this.http.post('http://localhost:7000/exam-portal/user/authenticate',loginData)
  }
}
