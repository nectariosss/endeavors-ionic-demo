import { NgModule } from '@angular/core';
import { EndeavorCardComponent } from './components/endeavor-card/endeavor-card.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChecklistComponent } from './components/endeavor-card/components/checklist/checklist.component';
import { ContentBoxComponent } from './components/endeavor-card/components/content-box/content-box.component';
import { StatusToggleComponent } from './components/endeavor-card/components/status-toggle/status-toggle.component';
import { FormsModule } from '@angular/forms';
import { TimeframeComponent } from './components/endeavor-card/components/timeframe/timeframe.component';
import { AuditComponent } from './components/endeavor-card/components/audit/audit.component';
import { TimeProgressionComponent } from './components/endeavor-card/components/time-progression/time-progression.component';
@NgModule({
  declarations: [
    EndeavorCardComponent,
    ChecklistComponent,
    ContentBoxComponent,
    TimeframeComponent,
    StatusToggleComponent,
    AuditComponent,
    TimeProgressionComponent,
  ],
  imports: [IonicModule, CommonModule, MatIconModule, FormsModule],
  exports: [EndeavorCardComponent],
})
export class EndeavorsModule {}
