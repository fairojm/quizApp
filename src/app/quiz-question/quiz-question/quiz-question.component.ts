import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { questionModal } from 'src/app/modal/question.modal';
import { quiz_info_modal } from 'src/app/modal/quiz-info.modal';
import { ApiStorageService } from 'src/app/service/api-storage.service';
import { DataService } from 'src/app/service/data.service';
import {MatDialog} from '@angular/material/dialog';
import { ResultComponent } from 'src/app/result/result.component';
import { QuizQuestionModule } from '../quiz-question.module';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit {
  quizInfo: quiz_info_modal;
  wholeQuestions: any;
  currQuestion: any;
  timer = 0;

  @ViewChild('question_name') questionNameElementRef: ElementRef;
  interval: any;
  clock: string;
  // tslint:disable-next-line: variable-name
  display_timer: any ={hours:{digit1:'',digit2:''}, minutes:{digit1:'',digit2:''}, seconds:{digit1:'',digit2:''}};

  // tslint:disable-next-line: max-line-length
  constructor(private dataService: DataService, private apiService: ApiStorageService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
    if (this.dataService.quizInfo) {
      this.quizInfo = this.dataService.quizInfo;
      this.getQuestions();
    }
    else{
      this.router.navigate(['home'], {replaceUrl: true});
    }
  }
  // tslint:disable-next-line: typedef
  getQuestions() {
    this.apiService.getQuizQuestion(this.quizInfo.category_id).subscribe(apiResponse => {
      if (apiResponse.response_code === 0) {
        this.wholeQuestions = apiResponse.results;
        // tslint:disable-next-line: forin
        for (const index in this.wholeQuestions) {
          this.wholeQuestions[index].question_index = Number(index);
          this.wholeQuestions[index].all_answers = [this.wholeQuestions[index].correct_answer,
          ...this.wholeQuestions[index].incorrect_answers];
          this.wholeQuestions[index].all_answers.sort(() => Math.random() - 0.5);
        }
        console.log(this.wholeQuestions);
        this.gotoQuestion(0);
        this.startTimer();
      }
      else {
        this.handleError(apiResponse.response_code);
      }
    });
  }
  // tslint:disable-next-line: typedef // tslint:disable-next-line: variable-name
  gotoQuestion(index: number) {
    console.log(index, this.wholeQuestions);
    this.currQuestion = this.wholeQuestions[index];
  }
  // tslint:disable-next-line: typedef
  handleError(code) {
    let msg: string;
    switch (code) {
      case 1:
        msg = 'No Results Found';
        break;
      case 2:
        msg = 'Invalid Parameters';
        break;
    }
    alert(msg);
  }
  // tslint:disable-next-line: typedef
  startTimer() {
    this.interval = setInterval(() => {
      this.timer += 1;
      this.display_timer  = this.getDisplayTimer(this.timer);
      // console.log(this.display_timer);
    }, 1000);
  }
  // tslint:disable-next-line: typedef
  getDisplayTimer(time: number) {
    const hours = '0' + Math.floor(time / 3600);
    const minutes = '0' + Math.floor(time % 3600 / 60);
    const seconds = '0' + Math.floor(time % 3600 % 60);

    return {
      hours: { digit1: hours.slice(-2, -1), digit2: hours.slice(-1) },
      minutes: { digit1: minutes.slice(-2, -1), digit2: minutes.slice(-1) },
      seconds: { digit1: seconds.slice(-2, -1), digit2: seconds.slice(-1) },
    };
  }
  // tslint:disable-next-line: typedef
  submitTest() {
    if (this.interval) {
      clearInterval(this.interval);
   }
   let report = this.generateTestReport() ;
    const dialog = this.matDialog.open(ResultComponent, {
      data:report,
      minWidth: '40%',
      disableClose: true
    });
    dialog.afterClosed().subscribe(rr=>{
      this.dataService.quizInfo = {student_name:'',category_id:null,category_name:''}
      this.router.navigate(['home'],{replaceUrl:true})
    })

  }
  generateTestReport () {
    let report = {correct_question: "",tot_time_taken: '', wrong_question: '',student_name:this.dataService.quizInfo.student_name,result:''}
    report.correct_question = this.wholeQuestions.filter(vv => vv.is_selected_option_correct  == false);
    report.wrong_question = this.wholeQuestions.filter(vv => vv.is_selected_option_correct == true);
    report.tot_time_taken = this.display_timer;
    report.result = report.correct_question.length >= 5 ? 'PASS' : 'FAIL';
    return report
  }

}
