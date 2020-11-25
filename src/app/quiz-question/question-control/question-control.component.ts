import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-question-control',
  templateUrl: './question-control.component.html',
  styleUrls: ['./question-control.component.scss']
})
export class QuestionControlComponent implements OnInit {
  questionControl: FormControl = new FormControl('');
  @Input() currQuestion: any;
  @Output() answer = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.currQuestion) {
      this.questionControl.enable();
      this.questionControl.setValue('');
    }
  }
  radioChange(answer: string) {
    console.log(answer)
    this.currQuestion.selected_option = answer;
    this.questionControl.disable();
    this.checkAnswer(answer)
  }
  checkAnswer(answer) {
    this.currQuestion.is_selected_option_correct = answer == this.currQuestion.correct_answer
  }

}
