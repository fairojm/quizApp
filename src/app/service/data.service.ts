import { Injectable } from '@angular/core';
import { quiz_info_modal } from '../modal/quiz-info.modal';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  quizInfo: quiz_info_modal;
  constructor() { }
}
