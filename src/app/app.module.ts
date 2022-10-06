import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionDisplayComponent } from './components/dashboard/admin/displayQuestions/question-display.component';
import { QuestionGroupDisplayComponent } from './components/dashboard/admin/displayQuestionGroups/question-group-display.component';
import { QuizModifyComponent } from './components/dashboard/admin/modifyQuiz/quiz-modify.component';
import { UserComponent } from './components/landingPage/userLogin/user.component';
import { InfoComponent } from './components/landingPage/info/info.component';
import { QuizdisplayComponent } from './components/dashboard/user/displayQuiz/quizdisplay.component';
import { CreatebuttonComponent } from './components/dashboard/admin/createButton/createButton.component';
import { CreategrpformComponent } from './components/dashboard/admin/createGroupForm/creategrpform.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { AdminHomeComponent } from './components/dashboard/admin/admin-home/admin-home.component';
import { BodyComponent } from './components/dashboard/body/body.component';
import { UpdateQuestionGroupsComponent } from './components/dashboard/admin/update-question-groups/update-question-groups.component';
import { UpdateQuizComponent } from './components/dashboard/admin/update-quiz/update-quiz.component';
import { CreateQuizComponent } from './components/dashboard/admin/create-quiz/create-quiz.component';
import { DisplayQuizComponent } from './components/dashboard/admin/display-quiz/display-quiz.component'

import { SidenavbarUserComponent } from './components/dashboard/user/sidenavbar-user/sidenavbar-user.component';
import { DashboardComponent } from './components/dashboard/user/dashboard/dashboard.component';
import { ProfileComponent } from './components/dashboard/user/profile/profile.component';
import { QuizPageComponent } from './components/dashboard/user/quiz-page/quiz-page.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDisplayComponent,
    QuestionGroupDisplayComponent,
    QuizModifyComponent,
    UserComponent,
    InfoComponent,
    QuizdisplayComponent,
    CreatebuttonComponent,
    CreategrpformComponent,
    SideNavbarComponent,
    AdminHomeComponent,
    BodyComponent,
    UpdateQuestionGroupsComponent,
    UpdateQuizComponent,
    CreateQuizComponent,
    DisplayQuizComponent
    SidenavbarUserComponent,
    DashboardComponent,
    ProfileComponent,
    QuizPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
