import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuestionSharingService {

  private questions = new BehaviorSubject<any[]>([]);
  selectedQuestions = this.questions.asObservable();

  setQuestions(data: any){
    this.questions.next(data);
  }

  // getQuestions(){
  //     return this.questions.asObservable();
  // }
}
