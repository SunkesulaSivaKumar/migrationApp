import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-migration',
  templateUrl: './migration.component.html',
  styleUrls: ['./migration.component.scss']
})
export class MigrationComponent {
  isOffcanvasShown: boolean = false;
  isToastShown: boolean = false;
  progressValue: number = 0;

  startMigration() {
    this.isOffcanvasShown = true;
    this.progressValue = 0;


    const migrationInterval = interval(100);
    const maxProgress = 100;
    migrationInterval.pipe(takeWhile(() => this.progressValue < maxProgress)).subscribe(() => {
      this.progressValue += 1;
    },
      () => { },
      () => {
        this.isOffcanvasShown = false;
        this.progressValue = 0;
        this.showCompletionToast();
      });
  }

  toggleOffcanvas() {
    this.isOffcanvasShown = !this.isOffcanvasShown;
  }

  showCompletionToast() {
    this.isToastShown = true;


    setTimeout(() => {
      this.isToastShown = false;
    }, 3000);
  }

}
