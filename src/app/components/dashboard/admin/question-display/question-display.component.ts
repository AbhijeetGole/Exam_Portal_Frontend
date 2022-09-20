import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent implements OnInit {
  questions: any[] = [];
  screenWidth: any;

  constructor(private questionService: QuestionService) {
    this.screenWidth = window.innerWidth;
  }

  getQuestions() {
    this.questionService.getAllQuestions()
      .subscribe(
        (response: any) => {
          console.log('response received');
          this.questions = response;
        },
        (error) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  show(id: any) {
    console.log(id)
  }

  deleteQuestion(id: any) {
    this.questionService.deleteQuestion(id).subscribe(res => {
      console.log(res)
      alert("Question deleted successfully");
      location.reload()
    })
  }

  
}