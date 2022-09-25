import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/landingPage/info/info.component';
import { UserComponent } from './components/landingPage/user/user.component';
import { QuestionDisplayComponent } from './components/dashboard/admin/question-display/question-display.component';
import { QuizdisplayComponent } from './components/dashboard/user/quiz-display/quiz-display.component';
import { QuestionGroupDisplayComponent } from './components/dashboard/admin/question-group-display/question-group-display.component';
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
  component: QuestionDisplayComponent,
},
{
  path: 'question-group',
  component: QuestionGroupDisplayComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
