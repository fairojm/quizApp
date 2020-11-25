import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  quiz_info_modal } from '../modal/quiz-info.modal';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quizDetailsFormGroup: FormGroup;
  categoryList: any = [
    {
      id: '9',
      name: 'General'
    },
    {
      id: '21',
      name: 'Sports'
    },
    {
      id: '23',
      name: 'History'
    },
    {
      id: '25',
      name: 'Art'
    },
    {
      id: '18',
      name: 'Computer Science'
    }
  ];
  // tslint:disable-next-line: variable-name
  constructor(private _fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.quizDetailsFormGroup = this._fb.group({
      category_id: [null, Validators.required],
      student_name: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  startQuizFun() {
    if (this.quizDetailsFormGroup.invalid) {
      this.quizDetailsFormGroup.markAllAsTouched();
      this.quizDetailsFormGroup.markAsDirty();
      return;
    }
    const records: quiz_info_modal = this.quizDetailsFormGroup.value;
    records.category_name = this.categoryList.filter(val => val.id === records.category_id)[0].name;
    console.log(records);
    this.dataService.quizInfo = records;
    this.router.navigate(['quiz-question']);
  }

}
