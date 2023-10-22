import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, take } from 'rxjs';
import { Directive, Endeavor, Idea, Problem, Resource, Task, TimeFrame } from '../../models/endeavor';
import { EndeavorsService } from '../../services/endeavors.service';
import { IonToast } from '@ionic/angular';

@Component({
  selector: 'endeavor-card',
  templateUrl: './endeavor-card.component.html',
  styleUrls: ['./endeavor-card.component.scss'],
})
export class EndeavorCardComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

//  -------------------  ViewChildren  -------------------
  @ViewChild('cardToast') cardToast: IonToast;
  @ViewChild('checklistToast') checklistToast: IonToast;

//  -------------------  Inputs  -------------------
  @Input() isEditing: boolean = false;
  @Input() endeavor: Endeavor;
  @Input() newTitle: string;


//  -------------------  Outputs  -------------------
 @Output() endeavorSaved: EventEmitter<null> = new EventEmitter<null>();

  constructor(private _endeavorsService: EndeavorsService) {}

  ngOnInit(): void {}

  saveEndeavor() {
    this.endeavor.name = this.newTitle;
    this._endeavorsService.updateEndeavor(this.endeavor).subscribe({
      next: (endeavor) => {
        this.endeavorSaved.emit();
        this.cardToast.message = 'Endeavor updated!';
        this.cardToast.present();
      },
      error: (err) => {
        this.cardToast.message = 'Error updating endeavor!';
        this.cardToast.present();
      },
    });
  }

  isAmbientUpdatedHandler(newIsAmbient: boolean) {
    this.endeavor.isAmbient = newIsAmbient;
    this.saveEndeavor();
  }

  isAttainableUpdatedHandler(newisAttainable: boolean) {
    this.endeavor.isAttainable = newisAttainable;
    this.saveEndeavor();
  }

  isArchivedHandler(newisArchived: boolean) {
    this.endeavor.archived = newisArchived;
    this.saveEndeavor();
  }

  isCompletedHandler(newisCompleted: boolean) {
    this.endeavor.completed = newisCompleted;
    this.saveEndeavor();
  }

  isActiveUpdatedHandler(newisActive: boolean) {
    this.endeavor.isActive = newisActive;
    this.saveEndeavor();
  }

  abstractUpdatedHandler(newAbstract: string) {
    this.endeavor.abstract = newAbstract;
  }

  longAimUpdatedHandler(newLongAim: string) {
    this.endeavor.longAim = newLongAim;
  }

  instantAimUpdatedHandler(newInstantAim: string) {
    this.endeavor.instantAim = newInstantAim;
  }

  hasTimeFrameHandler(newHasTimeframe: boolean) {
    this.endeavor.timeframe.hasTimeFrame = newHasTimeframe;
  }

  timeframeUpdatedHandler(timeframe: TimeFrame) {
    this.endeavor.timeframe = timeframe;
  }

  hasScoreHandler(newHasScore: boolean) {
    this.endeavor.score.hasScore = newHasScore;
  }

  notesUpdatedHandler(newNotes: string) {
    this.endeavor.notes = newNotes;
  }

  scoreUpdatedHandler(newscore: number) {
    this.endeavor.score.upvotes = newscore;
  }

  upvotesAdjustedHandler(upvotes: number) {
    this.endeavor.score.upvotes = upvotes;
    this._endeavorsService
      .updateEndeavor(this.endeavor)
      .pipe(take(1))
      .subscribe();
  }

  directivesUpdatedHandler(newDirectives: Directive[]) {
    this.checklistToast.message = 'Directives updated!';
    this.checklistToast.present();
    this.endeavor.directives = newDirectives;
  }

  tasksUpdatedHandler(newTasks: Task[]) {
    this.checklistToast.message = 'Tasks updated!';
    this.checklistToast.present();
    this.endeavor.tasks = newTasks;
  }

  ideasUpdatedHandler(newIdeas: Idea[]) {
    this.checklistToast.message = 'Ideas updated!';
    this.checklistToast.present();
    this.endeavor.ideas = newIdeas;
  }

  problemsUpdatedHandler(newProblems: Problem[]) {
    this.checklistToast.message = 'Problems updated!';
    this.checklistToast.present();
    this.endeavor.problems = newProblems;
  }

  resourcesUpdatedHandler(newResources: Resource[]) {
    this.checklistToast.message = 'Resources updated!';
    this.checklistToast.present();
    this.endeavor.resources = newResources;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
