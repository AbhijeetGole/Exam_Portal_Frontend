import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionGroupDisplayComponent } from '../displayQuestionGroups/question-group-display.component'; 
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  id:any = '';
  questionGroups: any[] = [];
  //filteredQuestions: any[] = [];
  checked:any[] = [];
  selectAll: boolean = false;
  Quiz: any = {
    title: '',
    description: '',
    duration: '',
  };

  constructor(private questionService: QuestionService, private questionGrpService: QuestionGrpService, 
    private router: Router, private quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getQuestionGroups();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getQuizById(this.id);
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

  getQuizById(id: any) {
    this.quizService.getQuizById(id)
      .subscribe(
        (response: any) => {
          this.checked = response.questionGroup;
          this.Quiz.title = response.title;
          this.Quiz.description = response.description;
          this.Quiz.duration = response.endTime;
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
      )
  }

  updateQuiz(data:any){
    // console.log(data);
    let quizUpdate = {
      title: data.title,
      description: data.description,
      startTime: '0',
      endTime: data.duration,
      questionGroup: this.checked
    }

    // console.log(this.id);
    // console.log(quizUpdate);

    this.quizService.updateQuizById(this.id, quizUpdate).subscribe((response: any) => {
      console.log('Question Group Updated Successfully!');
    }, (error) => {
      console.log(error);
    });

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
