import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionGrpService } from 'src/app/services/question-grp.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-question-groups',
  templateUrl: './update-question-groups.component.html',
  styleUrls: ['./update-question-groups.component.css']
})
export class UpdateQuestionGroupsComponent implements OnInit {
  id: any = '';
  questions: any[] = [];
  filteredQuestions: any[] = [];
  checked:any[] = [];
  selectAll: boolean = false;
  QuestionGroup: any = {
    name: '',
    type: '',
  };

  constructor(private questionService: QuestionService, private questionGrpService: QuestionGrpService, 
    private router: Router, private route: ActivatedRoute){}//, private questionGroupDisplay: QuestionGroupDisplayComponent) { }

  ngOnInit(): void {
    // this.questions = JSON.parse(localStorage.getItem("questions") || '[]');
    // console.log(this.questions);  
    // this.questionSharingService.selectedQuestions.subscribe((data) => {
    //   this.questions = data;
    // },
    // (error) => {
    //   console.log(error);
    // });
    this.getQuestions();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getQuestionGroupById(this.id);
  }

  getQuestions() {
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

  getQuestionGroupById(id: any){
    this.questionGrpService.getQuestionGroupbyId(id).subscribe((response: any) => {
      this.checked = response.questionID;
      this.QuestionGroup.name = response.name;
      this.QuestionGroup.type = response.type;
    }, (error: any) => {
      console.log(error.message);
    })
  }

  updateQuestionGroup(data:any){
    console.log(data);
    let questionGroupUpdate = {
      name: data.name,
      type: data.type,
      questionID: this.checked
    }

    console.log(this.id);
    console.log(questionGroupUpdate);

    this.questionGrpService.updateQuestionGroup(this.id, questionGroupUpdate).subscribe((response: any) => {
      console.log('Question Group Updated Successfully!');
    }, (error) => {
      console.log(error);
    });
    this.router.navigate(['/question-group']);
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
