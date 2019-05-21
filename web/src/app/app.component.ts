import { Component, ViewChild, ElementRef, ViewChildren, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit{
  public inputGridValues: Array<Puzzle> = [];

  @ViewChild("gridRef") gridRef: ElementRef;
  public durationMoment;
  private resettingInterval;
  public duration;
  public isBuildYourOwn = false;
  public initialPuzzleIndexes: Array<Puzzle> = [];
  public loading = false;

  constructor(
    private _rest: RestApisService,
    private _log: LoggerService
  ) { }


  ngOnInit(){
    //load hardcoded sudoku on Init
    this.buildNewPuzzle(true);
    this.startTimer();
  }

  //Starts and increments the timer(0:00:00) 
  startTimer() {
    clearInterval(this.resettingInterval);
    this.durationMoment = moment().startOf('day');
    this.resettingInterval = setInterval(() => {
      this.duration = this.durationMoment.add(1, 's').format('H:mm:ss')
    }, 1000)
  }

  //clears out the values that are assigned to td elements and sets background color to white
  clearGridValues(nonEditable: boolean) {
    Array.from(this.gridRef.nativeElement.children).forEach((row: any, index) => {
      Array.from(row.children).forEach((value, index) => {
        if (nonEditable) {
          row.children[index].children[0].setAttribute('readOnly', nonEditable);
        } else {
          row.children[index].children[0].removeAttribute('readOnly');
        }
        row.children[index].children[0].value = '';
        row.children[index].children[0].style.backgroundColor = "white";
      })
    })
  }

  //Used template reference to get children of table and assigned values to td elements based on row and col positions.
  //Sets background color of initial puzzle to grey and background color of final puzzle to yellow
  setGridValues(color: string) {
    this.inputGridValues.forEach((grid: any) => {
      Array.from(this.gridRef.nativeElement.children).forEach((row: any, rowIndex) => {
        if (rowIndex === (grid.row - 1)) {
          Array.from(row.children).forEach((value, colIndex) => {
            if (colIndex === grid.col - 1 && grid.val != 0 && this.initialPuzzleIndexes.filter(x => (x.row == rowIndex && x.col == colIndex)).length == 0) {
              this.initialPuzzleIndexes.push(new Puzzle(rowIndex, colIndex, grid.val));
              row.children[colIndex].children[0].value = grid.val;
              row.children[colIndex].children[0].style.backgroundColor = color;
            }
          })
        }
      })
    })
  }

  //Resets duration to 0:00:00 and clears out setInterval
  clearTimer() {
    this.durationMoment = '';
    this.duration = '';
    clearInterval(this.resettingInterval);
  }

  //Makes service call to display initial puzzle with random values
  buildNewPuzzle(hardCoded : boolean): void {
    this.isBuildYourOwn = false;
    this.initialPuzzleIndexes = [];
    this.clearGridValues(true);
    this._rest.getNewPuzzle(hardCoded)
      .subscribe((response: PuzzleInput) => {
        this.inputGridValues = response.puzzle;
        this.setGridValues('lightgrey');
      }, getNewPuzzleErr => {
        this._log.log(getNewPuzzleErr);
      });
  }

  //allows user to edit grid
  buildOwnPuzzle(): void {
    this.isBuildYourOwn = true;
    this.clearGridValues(false);
  }

  //gets the valus from dom elements and builds service request
  buildRequest() {
    this.inputGridValues = [];
    this.initialPuzzleIndexes = [];
    let val: number = 0;
    Array.from(this.gridRef.nativeElement.children).forEach((row: any, rowIndex) => {
      Array.from(row.children).forEach((value, colIndex) => {
        val = row.children[colIndex].children[0].value == '' ? 0 : parseInt(row.children[colIndex].children[0].value);
        this.inputGridValues.push(new Puzzle(rowIndex + 1, colIndex + 1, val));
        if (val != 0) {
          this.initialPuzzleIndexes.push(new Puzzle(rowIndex, colIndex, val));
        }
      })
    })
  }

  //Makes service call and retrieves solution for the puzzle
  solvePuzzle() {
    if (this.isBuildYourOwn) {
      this.buildRequest();
    }
    this.loading = true;
    this._rest.solvePuzzle(this.inputGridValues)
      .subscribe((response: PuzzleInput) => {
        this.loading = false;
        this.isBuildYourOwn = false;
        if (response.puzzle.length < 81) {
          alert('Unable to Solve Puzzle. Please start a new one');
          return;
        }
        this.inputGridValues = response.puzzle;
        this.setGridValues('yellow');
      }, solvePuzzleErr => {
        this._log.log(solvePuzzleErr);
      });
  }
}
