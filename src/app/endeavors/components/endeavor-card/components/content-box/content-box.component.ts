import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('500ms ease-in-out')]),
      transition(':leave', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class ContentBoxComponent implements OnInit {


// -------------------  Inputs, Outputs  -------------------
  @Input() title: string;
  @Input() content: string = '';
  @Input() newContent: string = '';
  @Input() isEditing: boolean;
  isChangingContent: boolean = false;
  @Output() contentUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onChangeContent() {
    this.content = this.newContent;
    this.contentUpdated.emit(this.content);
  }

  ngOnInit() {}
}
