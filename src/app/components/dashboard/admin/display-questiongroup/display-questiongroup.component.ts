import { Component, OnInit } from '@angular/core';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UpdateDeletedQuestionService } from 'src/app/services/update-deleted-question.service';
import { UpdateDeletedQuestionGroupService } from 'src/app/services/update-deleted-question-group.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-question-group-display',
  templateUrl: './display-questiongroup.component.html',
  styleUrls: ['./display-questiongroup.component.css']
})
export class QuestionGroupDisplayComponent implements OnInit {

  questionGrps: any[] = [];
  que: any = {};
  screenWidth: any;
  deleteQueId: any;
  showCreateToast = false;
  showUpdateToast = false;
  showDeleteToast = false;
  uservalue: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;

  constructor(private questionGrpService: QuestionGrpService, private apiSerive: ApiService,
    private http: HttpClient, private router: Router, private cookie: CookieService, private toastr: ToastrService,
    private updateDeletedQuestionService: UpdateDeletedQuestionService,
    private updateDeletedQuestionGroupService: UpdateDeletedQuestionGroupService) {
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
          Swal.fire("Alert", "You are not LoggedIn", "warning")
          this.router.navigate([''])
        }
      }, (error: any) => {
        Swal.fire("Alert", "You are not LoggedIn", "warning")
        this.router.navigate([''])
      })

    this.getQuestionGroup();

    this.updateDeletedQuestionService.selectedId.subscribe((id: any) => {
      if (id != '') {
        this.updateQuestionGroupWithId(id);
      }
    }, (error: any) => {
      console.log(error.message);
    })

    if (this.screenWidth < 378) {
      this.tableSize = 3;
    }
    if (this.screenWidth > 378 && this.screenWidth < 480) {
      this.tableSize = 4 ;
    }
    if (this.screenWidth > 480) {
      this.tableSize = 6;
    }
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

  updateQuestionGroup(id: any) {
    this.router.navigate(['question-group/updategroup', id])
  }

  deleteQuestionGroup(id: any) {
    console.log(id);
    // this.showDeleteToast = false;
    this.questionGrpService.deleteQuestionGroup(id).subscribe((res: any) => {
      this.toastr.error("Question Group Deleted!");
      // console.log(res)
      this.updateDeletedQuestionGroupService.setDeletedQuestionGroupId(id);
      // this.showDeleteToast = true;
      this.getQuestionGroup();
    })
  }

  updateQuestionGroupWithId(id: any) {
    this.questionGrps.forEach(questionGrp => {
      let index = questionGrp.questionID.indexOf(id);

      if (index != -1) {
        questionGrp.questionID.splice(index, 1);

        let questionGroupUpdate = {
          title: questionGrp.title,
          topic: questionGrp.topic,
          questionID: questionGrp.questionID
        }

        this.questionGrpService.updateQuestionGroup(questionGrp._id, questionGroupUpdate).subscribe((response: any) => {
          this.updateDeletedQuestionService.setDeletedQuestionId('');
        }, (error: any) => {
          console.log(error.message);
        })
      }
    })
  }

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

  onTableDataChange(event: any) {
    this.page = event;
    this.getQuestionGroup();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getQuestionGroup();
  }
}
