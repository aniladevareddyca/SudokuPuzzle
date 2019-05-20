import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { RestApisService } from './services/restApis.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { TableStructure } from './table-structure.directive';
import { TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { LoggerService } from './services/logger.service';
import { PuzzleInput } from './models/puzzle-input.model';
import { Puzzle } from './models/puzzle.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public inputGridValues: Array<Puzzle> = [];

  @ViewChild("gridRef") gridRef: ElementRef;
  private durationMoment;
  private resettingInterval;
  private duration;
  public disableStart = false;
  public difficultyLevel = 'M';

  constructor(
    private _rest: RestApisService,
    private _log: LoggerService
    ) { }

  startTimer() {
    clearInterval(this.resettingInterval);
    this.durationMoment = moment().startOf('day');
    this.resettingInterval = setInterval(() => {
      this.duration = this.durationMoment.add(1, 's').format('H:mm:ss')
    }, 1000)
  }

  setGridValues() {
    this.inputGridValues.forEach((grid: any) => {
      Array.from(this.gridRef.nativeElement.children).forEach((row: any, index) => {
        if (index === (grid.row - 1)) {
          Array.from(row.children).forEach((value, index) => {
            if (index === grid.col - 1 && grid.val != 0) {
              row.children[index].children[0].setAttribute('value', grid.val);
              row.children[index].children[0].style.backgroundColor = "lightgrey";
            }
          })
        }
      })
    })
  }

  clearTimer() {
    this.durationMoment = '';
    this.duration = '';
    clearInterval(this.resettingInterval);
  }

  buildNewPuzzle(): void {   
    this._rest.getNewPuzzle(this.difficultyLevel)
      .subscribe((response: PuzzleInput) => {
        this.disableStart = true;
        this.inputGridValues = response.puzzle;
        this.setGridValues();
      }, getNewPuzzleErr => {
        this._log.log(getNewPuzzleErr);
      });
  }

  solvePuzzle() {
    this.disableStart = false;
    this._rest.solvePuzzle(this.inputGridValues)
      .subscribe((response: PuzzleInput) => {
        this.disableStart = true;
        this.inputGridValues = response.puzzle;
        this.setGridValues();
      }, getNewPuzzleErr => {
        this._log.log(getNewPuzzleErr);
      });
  }
}
