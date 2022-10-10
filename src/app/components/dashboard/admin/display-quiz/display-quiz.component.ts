import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { QuizService } from 'src/app/services/quiz.service';
import { environment } from 'src/environments/environment';
import { UpdateDeletedQuestionGroupService } from 'src/app/services/update-deleted-question-group.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.css']
})
export class DisplayQuizComponent implements OnInit {

  quizzes: any[] = [];
  que: any = {};
  screenWidth: any;
  deleteQueId: any;
  showUpdateToast = false;
  showQuizDeleteToast = false;
  showCopyToast = false;
  uservalue: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;

  constructor(private quizService: QuizService, private apiSerive: ApiService, private toastr: ToastrService,
    private http: HttpClient, private router: Router, private cookie: CookieService,
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
          Swal.fire("Alert","You are not LoggedIn","warning")
          this.router.navigate([''])
        }
      },(error: any) => {
        Swal.fire("Alert","You are not LoggedIn","warning")
        this.router.navigate([''])
      })

    this.getQuizzes();

    this.updateDeletedQuestionGroupService.selectedId.subscribe((id: any) => {
      if (id != '') {
        this.updateQuizWithId(id);
      }
    }, (error: any) => {
      console.log(error.message);
    })

    if (this.screenWidth < 378) {
      this.tableSize = 3;
    }
    if (this.screenWidth > 378 && this.screenWidth < 480) {
      this.tableSize = 4;
    }
    if (this.screenWidth > 480) {
      this.tableSize = 6;
    }
  }

  getQuizzes() {
    this.quizService.getAllQuizes()
      .subscribe(
        (response: any) => {
          this.quizzes = response;
        },
        (error: any) => {
          console.error('Request failed with error' + error.message);
        }
      )
  }

  createQuiz() {
    this.router.navigate(['quiz/createquiz']);
  }

  updateQuiz(id: any) {
    this.router.navigate(['quiz/updatequiz', id]);
  }

  deleteQuizById(id: any) {
    // this.showQuizDeleteToast = false;
    this.quizService.deleteQuizById(id).subscribe((res: any) => {
      console.log(res)
      this.toastr.error("Quiz Deleted successfully!");
      // this.showQuizDeleteToast = true;
      this.getQuizzes();
    })
  }

  updateQuizWithId(id: any) {
    this.quizzes.forEach(quiz => {
      let index = quiz.questionGroup.indexOf(id);

      if (index != -1) {
        quiz.questionGroup.splice(index, 1);

        let quizUpdate = {
          title: quiz.title,
          description: quiz.topic,
          questionGroup: quiz.questionGroup
        }

        this.quizService.updateQuizById(quiz._id, quizUpdate).subscribe((response: any) => {
          this.updateDeletedQuestionGroupService.setDeletedQuestionGroupId('');
        }, (error: any) => {
          console.log(error.message);
        })
      }
    })
  }

  getQuizById(id: any) {
    this.quizService.getQuizById(id)
      .subscribe(
        (response: any) => {
          this.que = response;
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getQuizzes();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getQuizzes();
  }

  copyToClipboard(el: HTMLDivElement) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(el.innerText)
      this.showCopyToast = true;
    } else {
      console.log('Browser do not support Clipboard API');
    }
  }
}
