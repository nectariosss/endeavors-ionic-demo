import { Component, ViewChild } from '@angular/core';
import { Endeavor } from '../endeavors/models/endeavor';
import { EndeavorsService } from '../endeavors/services/endeavors.service';
import { AuthService } from '../core/services/auth.service';
import { IonToast, MenuController } from '@ionic/angular';
import { EndeavorCardComponent } from '../endeavors/components/endeavor-card/endeavor-card.component';
import { ConfigService } from '../core/services/config.service';
import { NameGeneratorService } from '../endeavors/services/name-generator.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // -------------------  Public Variables  -------------------
  public isAllowedToView: boolean = true;
  public password: string;
  public isDemo: boolean = this._configService.isDemo;
  public displayEndeavor: Endeavor;
  public isEditing: boolean = false;
  public endeavors: Endeavor[];
  public allEndeavors: Endeavor[] = [];
  public archivedEndeavors: Endeavor[] = [];
  public activeEndeavors: Endeavor[] = [];
  public ambientEndeavors: Endeavor[] = [];
  public attainableEndeavors: Endeavor[] = [];

  // -------------------  ViewChildren  -----------------
  @ViewChild('homeToast') toast: IonToast;
  @ViewChild(EndeavorCardComponent)
  endeavorCardComponent: EndeavorCardComponent;

  constructor(
    private _nameGeneratorService: NameGeneratorService,
    private _configService: ConfigService,
    private _endeavorsService: EndeavorsService,
    private _authService: AuthService,
    private _menuController: MenuController
  ) {}

  ngOnInit() {
    // Get endeavors from the database, sort and categorise them.
    this._endeavorsService.getEndeavors().subscribe({
      next: (endeavors: Endeavor[]) => {
        this.endeavors = endeavors;
        this.sortEndeavors(endeavors);
        this.categoriseEndeavors(endeavors);
        this.toast.message = `${endeavors.length} endeavors loaded!`;
        this.toast.present();
      },
      error: (err) => {
        console.log(err);
        this.isAllowedToView = false;
        this.toast.message = 'Error loading endeavors!';
        this.toast.present();
      },
    });
  }

  toggleMenu() {
    this._menuController.toggle();
  }

  deleteEndeavor() {
    if (!this.displayEndeavor) {
      alert('Please select an endeavor to delete first!');
      return;
    }

    const deleteEndeavor = this.endeavors.find(
      (endeavor) => endeavor.name === this.displayEndeavor.name
    );

    if (
      confirm(
        `You are about to delete ${deleteEndeavor.name} are you sure?`
      ) === false
    ) {
      return;
    }
    this.endeavors.splice(this.endeavors.indexOf(deleteEndeavor), 1);
    this.displayEndeavor = null;
    this._endeavorsService.deleteEndeavor(deleteEndeavor).subscribe({
      next: () => {
        this._endeavorsService.getEndeavors().subscribe({
          next: (endeavors: Endeavor[]) => {
            this.endeavors = endeavors;
            this.sortEndeavors(endeavors);
            this.categoriseEndeavors(endeavors);
          },
        });
        this.toast.message = 'Endeavor deleted!';
        this.toast.present();
      },
    });
  }

  checkPassword() {
    this._authService.enterPassPhrase(this.password);
    this._endeavorsService.getEndeavors().subscribe({
      next: (endeavors: Endeavor[]) => {
        this.isAllowedToView = true;
        this.endeavors = endeavors;
        this.sortEndeavors(endeavors);
        this.categoriseEndeavors(endeavors);
      },
      error: (err) => {
        this.isAllowedToView = false;
      },
    });
  }

  endeavorSavedHandler() {
    this._endeavorsService.getEndeavors().subscribe({
      next: (endeavors: Endeavor[]) => {
        this.endeavors = endeavors;
        this.sortEndeavors(endeavors);
        this.categoriseEndeavors(endeavors);
      },
      error: (err) => {},
    });
  }

  showEndeavor(name: string) {
    this.displayEndeavor = this.endeavors.find(
      (endeavor) => endeavor.name === name
    );
    this._menuController.close();
  }

  addNewEndeavor() {
    this._endeavorsService.createEndeavor().subscribe({
      next: () => {
        this._endeavorsService.getEndeavors().subscribe({
          next: (endeavors: Endeavor[]) => {
            this.endeavors = endeavors;
            this.sortEndeavors(endeavors);
            this.categoriseEndeavors(endeavors);
            this.toast.message = 'New endeavor created!';
            this.toast.present();

            this.displayEndeavor = endeavors.find(
              (endeavor) =>
                endeavor.name === this._nameGeneratorService.randomName
            );
          },
        });
      },
    });
  }

  enterEditMode() {
    this.isEditing = !this.isEditing;
  }

  onSaveEndeavor() {
    this.isEditing = false;
    this.endeavorCardComponent.saveEndeavor();
  }

  handleRefresh(event) {
    const currentlyDisplayEndeavorName = this.displayEndeavor.name;
    setTimeout(() => {
      this._endeavorsService.getEndeavors().subscribe({
        next: (endeavors: Endeavor[]) => {
          this.isAllowedToView = true;
          this.endeavors = endeavors;
          this.sortEndeavors(endeavors);
          this.categoriseEndeavors(endeavors);
          this.displayEndeavor = endeavors.find(
            (endeavor) => endeavor.name === currentlyDisplayEndeavorName
          );
          this.toast.message = `${endeavors.length} endeavors loaded!`;
          this.toast.present();
        },
        error: (err) => {
          this.isAllowedToView = false;
        },
      });
      event.target.complete();
    }, 2000);
  }

  sortEndeavors = (endeavors: Endeavor[]): Endeavor[] => {
    return endeavors.sort((a, b) => {
      // Prioritize endeavors named "new endeavor" // this is outdated
      if (
        a.name === this._nameGeneratorService.randomName &&
        b.name !== this._nameGeneratorService.randomName
      ) {
        return -1;
      }
      if (
        a.name !== this._nameGeneratorService.randomName &&
        b.name === this._nameGeneratorService.randomName
      ) {
        return 1;
      }

      // If neither or both are named "new endeavor", prioritize the one that's running.
      if (a.isActive && !b.isActive) {
        return -1; // a comes before b
      }
      if (!a.isActive && b.isActive) {
        return 1; // b comes before a
      }

      // If neither or both are currently running, then prioritize based on isAmbient.
      if (a.isAmbient && !b.isAmbient) {
        return -1;
      }
      if (!a.isAmbient && b.isAmbient) {
        return 1;
      }

      return 0; // a and b are equal
    });
  };

  categoriseEndeavors(endeavors): void {
    const uncompletedEndeavors = endeavors.filter(
      (endeavor) => !endeavor.archived && !endeavor.completed
    );
    const archivedEndeavors = endeavors.filter(
      (endeavor) => endeavor.archived || endeavor.completed
    );

    const uncompletedEndeavorsExceptAmbient = uncompletedEndeavors.filter(
      (endeavor) => !endeavor.isAmbient
    )

    this.archivedEndeavors = archivedEndeavors;
    this.allEndeavors = uncompletedEndeavorsExceptAmbient;
    this.activeEndeavors = endeavors.filter((endeavor) => endeavor.isActive);
    this.ambientEndeavors = endeavors.filter((endeavor) => endeavor.isAmbient);
    this.attainableEndeavors = endeavors.filter(
      (endeavor) => endeavor.isAttainable
    );
  }
}
