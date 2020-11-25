import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public testReport) {
    console.log(testReport);
   }

  ngOnInit(): void {
  }

}
