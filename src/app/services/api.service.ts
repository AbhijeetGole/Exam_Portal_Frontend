import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router } from '@angular/router';
import { CookieService} from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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
      
      Swal.fire('success',"Account Created! Please Login to Continue",'success');
    },error=>{
      Swal.fire("Alert","Something went wrong",'error')
      this.router.navigate([''])
    })

    return 'User registered successfully!';
  }
  
  LoginUser(user:any){
    this.http.post(environment.userUrl+'exam-portal/user/authenticate',user).subscribe((res:any)=>{
    this.uservalue=res;   
      this.cookie.set('jwt',res.data.token)
      this.user=this.uservalue.role.toString();
      localStorage.setItem("role",this.user)
     if(this.user=='admin'){
      this.router.navigate(['admin']);
    }else if(this.user=='user'){
      this.router.navigate(['user']);
    }
    },(error:any)=>{
      Swal.fire("Alert","Required Email or Password!",'error')
    })
    
    return 'User logged in successfully!';
  }

  logout(user:any){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    this.http.delete<any>(environment.userUrl+'exam-portal/user/logout',{ headers: headers }).subscribe((res:any)=>{
      console.log(res)
     
    })

    return 'User logged out successfully!';
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
  getUserInfo(){
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
     'jwt':this.cookie.get('jwt')

    });
    return  this.http.get(environment.userUrl+'exam-portal/user/getuser',{ headers: headers })
  }
  

}
