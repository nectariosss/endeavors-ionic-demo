import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeFrame } from '../../../../models/endeavor';

@Component({
  selector: 'timeframe',
  templateUrl: './timeframe.component.html',
  styleUrls: ['./timeframe.component.scss'],
})
export class TimeframeComponent implements OnInit {
  constructor() {}

  @Input() timeframe: TimeFrame;
  @Input() isEditing: boolean;
  @Input() startDate: Date;
  @Input() endDate: Date;

  @Output() timeframeUpdated: EventEmitter<TimeFrame> =
    new EventEmitter<TimeFrame>();
  ngOnInit() {}

  handleDateChangeForEnd(event) {
    this.timeframe.end = event.target.value;
    this.timeframeUpdated.emit(this.timeframe);
  }
  handleDateChangeForStart(event) {
    this.timeframe.start = event.target.value;
    this.timeframeUpdated.emit(this.timeframe);
  }

  onToggleTimeFrame() {
    this.timeframe.hasTimeFrame = !this.timeframe.hasTimeFrame;
    this.timeframeUpdated.emit(this.timeframe);
  }
}
