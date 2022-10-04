import { Component, OnInit } from '@angular/core';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router } from '@angular/router';
import { QuestionSharingService } from 'src/app/services/question-sharing.service';
import { ApiService } from '../../../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-question-group-display',
  templateUrl: './question-group-display.component.html',
  styleUrls: ['./question-group-display.component.css']
})
export class QuestionGroupDisplayComponent implements OnInit {

  questionGrps: any[] = [];
  que: any = {};
  screenWidth: any;
  deleteQueId: any;
  showUpdateToast = false;
  showDeleteToast = false;
  uservalue: any;

  constructor(private questionGrpService: QuestionGrpService, private apiSerive: ApiService,
    private http: HttpClient, private router: Router, private cookie: CookieService,
    private questionSharingService: QuestionSharingService) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'jwt': this.cookie.get('jwt')
    });

    this.http.get(environment.userUrl + 'exam-portal/token/validate', { headers: headers, withCredentials: true })
      .subscribe((data: any) => {
        this.uservalue = data
        if (this.uservalue != 'admin') {
          alert("You are not LoggedIn")
          this.router.navigate([''])
        }
      })

    this.getQuestionGroup();
  }

  getQuestionGroup() {
    this.questionGrpService.getAllQuestionGroup()
      .subscribe(
        (response: any) => {
          console.log('response received');
          this.questionGrps = response;
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  createQuestionGroup() {
    this.router.navigate(['question-group/creategroup']);
  }

  updateQuestionGroup(id: any){
    this.router.navigate(['question-group/updategroup', id])
  }

  deleteQuestionGroup(id: any) {
    console.log(id);
    this.showDeleteToast = false;
    this.questionGrpService.deleteQuestionGroup(id).subscribe((res: any) => {
      console.log(res)
      this.showDeleteToast = true;
      this.getQuestionGroup();
    })
  }

  // updateQuestionGroup(id: any, data: any) {
  //   this.showUpdateToast = false;
  //   this.questionGrpService.updateQuestionGroup(id, data).subscribe((data: any) => {
  //     this.showUpdateToast = true;
  //     this.getQuestionGroup();
  //   });
  // }

  getQuestionGroupById(id: any) {
    this.questionGrpService.getQuestionGroupbyId(id)
      .subscribe(
        (response: any) => {
          this.que = response;
          console.log("clicked")
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }
}
