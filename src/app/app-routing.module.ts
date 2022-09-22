import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/landingPage/info/info.component';
import { UserComponent } from './components/landingPage/user/user.component';
import { QuestionDisplayComponent } from './components/dashboard/admin/question-display/question-display.component';
import { QuizdisplayComponent } from './components/dashboard/user/quizdisplay/quizdisplay.component';
import { AuthGuard } from './auth.guard'
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
  // canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AppRoutingModule { }
