import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizQuestionRoutingModule } from './quiz-question-routing.module';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuestionControlComponent } from './question-control/question-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiStorageService } from '../service/api-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { DecodeHtmlStringPipe } from '../decode-html-string.pipe';
import { ResultComponent } from '../result/result.component';


@NgModule({
  declarations: [QuizQuestionComponent, QuestionControlComponent, DecodeHtmlStringPipe, ResultComponent],
  imports: [
    CommonModule,
    QuizQuestionRoutingModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [ApiStorageService, DecodeHtmlStringPipe]
})
export class QuizQuestionModule { }
