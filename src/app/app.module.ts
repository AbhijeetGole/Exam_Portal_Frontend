import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { AdminHomeComponent } from './components/dashboard/admin/admin-home/admin-home.component';
import { BodyComponent } from './components/dashboard/body/body.component'
import { UserComponent } from './components/landingPage/userLogin/user.component';
import { InfoComponent } from './components/landingPage/info/info.component';

import { QuestionDisplayComponent } from './components/dashboard/admin/display-questions/display-questions.component';
import { CreateQuestionComponent } from './components/dashboard/admin/create-question/create-question.component';

import { QuestionGroupDisplayComponent } from './components/dashboard/admin/display-questiongroup/display-questiongroup.component';
import { UpdateQuestionGroupsComponent } from './components/dashboard/admin/update-question-groups/update-question-groups.component';
import { CreateQueGrpComponent } from './components/dashboard/admin/create-questiongroup/create-questiongroup.component';

import { DisplayQuizComponent } from './components/dashboard/admin/display-quiz/display-quiz.component';
import { CreateQuizComponent } from './components/dashboard/admin/create-quiz/create-quiz.component';
import { UpdateQuizComponent } from './components/dashboard/admin/update-quiz/update-quiz.component';

import { QuizdisplayComponent } from './components/dashboard/user/display-quiz/quizdisplay.component';
import { UserDashboardComponent } from './components/dashboard/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './components/dashboard/user/profile/profile.component';
import { QuizPageComponent } from './components/dashboard/user/quiz-page/quiz-page.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
@NgModule({
  declarations: [
    AppComponent,
    QuestionDisplayComponent,
    QuestionGroupDisplayComponent,
    UpdateQuestionGroupsComponent,
    CreateQuizComponent,
    UpdateQuizComponent,
    DisplayQuizComponent,
    UserComponent,
    InfoComponent,
    QuizdisplayComponent,
    CreateQuestionComponent,
    CreateQueGrpComponent,
    SideNavbarComponent,
    AdminHomeComponent,
    BodyComponent,
    UserDashboardComponent,
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
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:900,
      positionClass:'toast-top-right',
      preventDuplicates:false
    })
    // ClipboardModule
  ],
  providers: [QuizPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
