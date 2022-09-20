import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionDisplayComponent } from './components/dashboard/admin/question-display/question-display.component';
import { QuestionModifyComponent } from './components/dashboard/admin/question-modify/question-modify.component';
import { QuestionGroupDisplayComponent } from './components/dashboard/admin/question-group-display/question-group-display.component';
import { QuestionGroupModifyComponent } from './components/dashboard/admin/question-group-modify/question-group-modify.component';
import { QuizModifyComponent } from './components/dashboard/admin/quiz-modify/quiz-modify.component';
import { UserComponent } from './components/landingPage/user/user.component';
import { InfoComponent } from './components/landingPage/info/info.component';
import { QuizdisplayComponent } from './components/dashboard/user/quizdisplay/quizdisplay.component';
import { CreateformComponent } from './components/dashboard/admin/createform/createform.component';

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
    QuizdisplayComponent,
    CreateformComponent,
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
