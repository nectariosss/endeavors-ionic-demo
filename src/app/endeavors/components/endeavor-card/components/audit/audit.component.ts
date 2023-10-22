import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Score } from '../../../../models/endeavor';

@Component({
  selector: 'audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss'],
})
export class AuditComponent implements OnInit {
  constructor() {}
  
  //  -------------------  Inputs, Outputs  -------------------
  @Input() isEditing: boolean;
  @Input() score: Score;
  @Output() upvotesAdjusted: EventEmitter<number> = new EventEmitter<number>();
  @Output() scoreUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {}

  onToggleScore() {
    this.score.hasScore = !this.score.hasScore;
    this.scoreUpdated.emit( this.score.hasScore );
  }

  incrementUpvotes() {
    this.score.upvotes++;
    this.upvotesAdjusted.emit(this.score.upvotes);
  }

  decreaseUpvotes() {
    this.score.upvotes--;
    this.upvotesAdjusted.emit(this.score.upvotes);
  }
}
