import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  Task,
  Directive,
  Resource,
  Idea,
  Problem,
} from '../../../../models/endeavor';
import { IonToast } from '@ionic/angular';

@Component({
  selector: 'checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent {
  public newItemTitle: string;
  public newItemDescription: string;
  public clickedItemName: string;

  // ------------------- Inputs -------------------
  @Input() isEditing: boolean;
  @Input() list: Task[] | Directive[];
  @Input() title: string;
  @Input() iconName: string;

  // ------------------- Outputs -------------------
  @Output() listUpdated: EventEmitter<
    Task[] | Directive[] | Resource[] | Idea[] | Problem[]
  > = new EventEmitter<
    Task[] | Directive[] | Resource[] | Idea[] | Problem[]
  >();
  @Output() listItemClicked: EventEmitter<string> = new EventEmitter<string>();

  // ------------------- ViewChildren --------------
  @ViewChild('toast') toast: IonToast;

  constructor() {}

  onListItemClick(name) {
    this.clickedItemName = this.clickedItemName === name ? null : name;
  }


  OnDeleteItem(index) {
    this.list.splice(index, 1);
    this.listUpdated.emit(this.list);
  }

  onAddItem() {
    if (this.newItemTitle === undefined || this.newItemTitle === '') {
      return;
    }
    this.list.push({
      name: this.newItemTitle,
      description: this.newItemDescription,
    });
    this.listUpdated.emit(this.list);
    this.newItemTitle = '';
    this.newItemDescription = '';
  }

  onCopyToClipboard(message) {
    navigator.clipboard.writeText(message);
    this.toast.message = 'Copied to clipboard';
    this.toast.present();
  }


  onEditItem(index) {
    if (!(this.newItemTitle === undefined || this.newItemTitle === '')) {
      this.list.push({
        name: this.newItemTitle,
        description: this.newItemDescription,
      });
      this.listUpdated.emit(this.list);
      this.newItemDescription = '';
      this.newItemTitle = '';
    }

    this.newItemTitle = this.list[index].name;
    this.newItemDescription = this.list[index].description;
    this.list.splice(index, 1);
  }



}
