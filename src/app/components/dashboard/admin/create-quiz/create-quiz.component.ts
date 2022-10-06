import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router } from '@angular/router';
import { QuestionGroupDisplayComponent } from '../displayQuestionGroups/question-group-display.component'; 
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  questionGroups: any[] = [];
  //filteredQuestions: any[] = [];
  checked:any[] = [];
  selectAll: boolean = false;
  Quiz: any = {
    title: '',
    description: '',
    duration: '15',
  };

  constructor(private questionService: QuestionService, private questionGrpService: QuestionGrpService, private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    this.getQuestionGroups()
  }

  getQuestionGroups() {
    this.questionGrpService.getAllQuestionGroup()
      .subscribe(
        (response: any) => {
          this.questionGroups = response;
          // localStorage.setItem("questions", JSON.stringify(this.questions))
          // this.questionSharingService.setQuestions(response);
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
    )
  }

  createQuiz(data:any){
    let quizPost = {
      title: data.title,
      description: data.description,
      startTime: "0",
      endTime: data.duration,
      questionGroup: this.checked
    }

    this.quizService.createQuiz(quizPost).subscribe((res:any) => {
      console.log('question group created successfully!');
      //this.questionGroupDisplay.getQuestionGroup()
    }, (error: any) => {
      console.log(error.message);
    })

    this.router.navigate(['/quiz']);
  }

  isChecked(id:any){
      if(this.checked.indexOf(id) == -1){
        return false;
      }

    return true;
  }

  onCheckChanged(e:any){

    let index = this.checked.indexOf(e.target.value);

    if(index == -1){
      this.checked.push(e.target.value);
    }else{
      this.checked.splice(index, 1);
    }

    console.log(this.checked);
  }
}

