import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';

const routes: Routes = [
  {
    path: '',
    component: QuizQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizQuestionRoutingModule { }
