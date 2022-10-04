import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/landingPage/userLogin/user.component';
import { QuestionDisplayComponent } from './components/dashboard/admin/displayQuestions/question-display.component';
import { QuizdisplayComponent } from './components/dashboard/user/displayQuiz/quizdisplay.component';
import { QuestionGroupDisplayComponent } from './components/dashboard/admin/displayQuestionGroups/question-group-display.component';
import { CreategrpformComponent } from './components/dashboard/admin/createGroupForm/creategrpform.component';
import { AdminHomeComponent } from './components/dashboard/admin/admin-home/admin-home.component';
import { DisplayQuizComponent } from './components/dashboard/admin/display-quiz/display-quiz.component';
import { UpdateQuestionGroupsComponent } from './components/dashboard/admin/update-question-groups/update-question-groups.component';
import { CreateQuizComponent } from './components/dashboard/admin/create-quiz/create-quiz.component';
import { UpdateQuizComponent } from './components/dashboard/admin/update-quiz/update-quiz.component';

const routes: Routes = [
  {
    path: "",
    component: UserComponent
  },
  {
    path: 'user',
    component: QuizdisplayComponent
  },
  {
    path: 'admin',
    component: AdminHomeComponent
  },
  {
    path: 'questions',
    component: QuestionDisplayComponent,
  },
  {
    path: 'question-group',
    component: QuestionGroupDisplayComponent,
  },
  {
    path: 'question-group/creategroup',
    component: CreategrpformComponent
  },
  {
    path: 'question-group/updategroup/:id',
    component: UpdateQuestionGroupsComponent
  },
  {
    path: 'quiz',
    component: DisplayQuizComponent
  },
  {
    path: 'quiz/createquiz',
    component: CreateQuizComponent
  },
  {
    path: 'quiz/updatequiz/:id',
    component: UpdateQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
