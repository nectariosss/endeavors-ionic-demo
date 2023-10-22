import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-status-toggle',
  templateUrl: './status-toggle.component.html',
  styleUrls: ['./status-toggle.component.scss'],
})
export class StatusToggleComponent implements OnInit {

  // -------------------  Inputs, Outputs  -------------------
  @Input() flag: boolean;
  @Input() isEditing: boolean;
  @Input() messageForTrue: string;
  @Input() messageForFalse: string;
  @Output() buttonToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  onToggleButton() {
    this.buttonToggled.emit(!this.flag);
  }
}
