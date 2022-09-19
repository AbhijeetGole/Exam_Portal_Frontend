import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionDisplayComponent } from './components/question-display/question-display.component';
import { QuestionModifyComponent } from './components/question-modify/question-modify.component';
import { QuestionGroupDisplayComponent } from './components/question-group-display/question-group-display.component';
import { QuestionGroupModifyComponent } from './components/question-group-modify/question-group-modify.component';
import { QuizModifyComponent } from './components/quiz-modify/quiz-modify.component';
import { UserComponent } from './components/landingPage/user/user.component';
import { InfoComponent } from './components/landingPage/info/info.component';
import { UserPortalComponent } from './components/user-portal/user-portal.component';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDisplayComponent,
    QuestionModifyComponent,
    QuestionGroupDisplayComponent,
    QuestionGroupModifyComponent,
    QuizModifyComponent,
    UserComponent,
    InfoComponent,
    UserPortalComponent,
    AdminPortalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
