import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router } from '@angular/router';
// import { QuestionGroupDisplayComponent } from '../displayQuestionGroups/question-group-display.component'; 
// import { QuestionSharingService } from 'src/app/services/question-sharing.service';
// import { SessionStorage, LocalStorage} from 'angular-web-storage';

@Component({
  selector: 'app-creategrpform',
  templateUrl: './creategrpform.component.html',
  styleUrls: ['./creategrpform.component.css']
})
export class CreategrpformComponent implements OnInit {

  // @SessionStorage() questions: any[] = [];
  questions: any[] = [];
  filteredQuestions: any[] = [];
  checked:any[] = [];
  selectAll: boolean = false;
  QuestionGroup: any = {
    name: '',
    type: '',
  };

  constructor(private questionService: QuestionService, private questionGrpService: QuestionGrpService, private router: Router){}//, private questionGroupDisplay: QuestionGroupDisplayComponent) { }

  ngOnInit(): void {
    // this.questions = JSON.parse(localStorage.getItem("questions") || '[]');
    // console.log(this.questions);  
    // this.questionSharingService.selectedQuestions.subscribe((data) => {
    //   this.questions = data;
    // },
    // (error) => {
    //   console.log(error);
    // });
    this.getQuestions()
  }

  getQuestions() {
    // console.log('called');
    this.questionService.getAllQuestions()
      .subscribe(
        (response: any) => {
          this.questions = response;
          this.filteredQuestions = response;
          // localStorage.setItem("questions", JSON.stringify(this.questions))
          // this.questionSharingService.setQuestions(response);
        },
        (error: any) => {
          console.error('Request failed with error' + error);
        }
    )
  }

  createQuestionGroup(data:any){
    let questionGroupPost = {
      name: data.name,
      type: data.type,
      questionID: this.checked
    }

    this.questionGrpService.createNewQuestionGroup(questionGroupPost).subscribe((res:any) => {
      console.log('question group created successfully!');
      //this.questionGroupDisplay.getQuestionGroup();
    }, (error: any) => {
      console.log(error.message);
    })

    this.router.navigate(['/question-group']);

    // this.questionService.createNewQuestion(data).subscribe((data: any) => {
    //   this.showCreateToast = true;
    //   this.formdisplay = !this.formdisplay;
    //   this.display.getQuestions();
    // })
  }

  isChecked(id:any){
    if(this.selectAll){

      this.checked = [];
      this.filteredQuestions.forEach(question => {
        this.checked.push(question._id);
      });

      console.log(this.checked)
      return true;
    }

      if(this.checked.indexOf(id) == -1){
        return false;
      }
      
    return true;
  }

  onCheckChanged(e:any){

    let index = this.checked.indexOf(e.target.value);
    this.selectAll = false;

    if(index == -1){
      this.checked.push(e.target.value);
    }else{
      this.checked.splice(index, 1);
    }

    console.log(this.checked);
  }

  onSelectAll(){
    this.selectAll = !this.selectAll;

    if(!this.selectAll){
      this.checked = [];
    }
    // console.log(this.selectAll);
  }

  getQuestionByTopic(data:any) {
    // console.log(data);
    this.filteredQuestions = [];
    if(data === 'All'){
      this.filteredQuestions = this.questions;
    }else{
      this.questions.forEach(question => {
          if(question.type === data){
            this.filteredQuestions.push(question);
          }
      });
    }
  }


}
