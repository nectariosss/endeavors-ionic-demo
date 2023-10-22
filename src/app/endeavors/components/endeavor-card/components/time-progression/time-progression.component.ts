import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'time-progression',
  templateUrl: './time-progression.component.html',
  styleUrls: ['./time-progression.component.scss'],
})
export class TimeProgressionComponent implements OnInit, OnDestroy {
  // -------------------  Inputs  -------------------
  @Input() set data(timeframe) {
    let startDate = new Date(timeframe.start);
    let endDate = new Date(timeframe.end);
    let currentDate = new Date();
    if (currentDate < startDate) {
      this.setProgress(0);
    } else if (currentDate > endDate) {
      this.setProgress(100);
    } else if (currentDate === startDate || currentDate === endDate) {
      this.setProgress(0);
    } else {
      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsedDuration = currentDate.getTime() - startDate.getTime();
      const progressPercentage = (elapsedDuration / totalDuration) * 100;
      this.setProgress(progressPercentage);
    }
  }

  // -------------------  Private Variables  -------------------
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {}

  ngOnInit(): void {}

  setProgress(percentage) {
    const progressBar = document.querySelector('.progress');
    progressBar.setAttribute('style', 'width: ' + percentage + '%');
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
