import { Component, OnInit } from '@angular/core';
import { QuestionGrpService } from 'src/app/services/question-grp.service';

@Component({
  selector: 'app-question-group-display',
  templateUrl: './question-group-display.component.html',
  styleUrls: ['./question-group-display.component.css']
})
export class QuestionGroupDisplayComponent implements OnInit {

  questionGrp: any[] = [];
  screenWidth: any;
  constructor(private questionGrpService: QuestionGrpService) {
    
  }

  getQuestionGrp() {
    this.questionGrpService.getAllQuestionGrp()
      .subscribe(
        (response: any) => {
          console.log('response received');
          this.questionGrp = response;
        },
        (error:any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  ngOnInit(): void {
  }

}
