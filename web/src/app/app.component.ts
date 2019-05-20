import { Component, ViewChild, ElementRef, ViewChildren, OnInit } from '@angular/core';
import { RestApisService } from './services/restApis.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { TableStructure } from './table-structure.directive';
import { TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { LoggerService } from './services/logger.service';
import { PuzzleInput } from './models/puzzle-input.model';
import { Puzzle } from './models/puzzle.model';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public inputGridValues: Array<Puzzle> = [];

  @ViewChild("gridRef") gridRef: ElementRef;
  private durationMoment;
  private resettingInterval;
  private duration;
  public disableStart = false;
  public puzzleIndexes : Array<number>=[];
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Popover description';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public loading = false;

  constructor(
    private _rest: RestApisService,
    private _log: LoggerService,
    private notifierService: NotifierService
    ) { }

    ngOnInit() {

     

    }
  
  startTimer() {
    clearInterval(this.resettingInterval);
    this.durationMoment = moment().startOf('day');
    this.resettingInterval = setInterval(() => {
      this.duration = this.durationMoment.add(1, 's').format('H:mm:ss')
    }, 1000)
  }
  clearGridValues(){
    Array.from(this.gridRef.nativeElement.children).forEach((row: any, index) => {
        Array.from(row.children).forEach((value, index) => {
            row.children[index].children[0].setAttribute('value', '');
            row.children[index].children[0].style.backgroundColor = "white";
          })
    })
  }
  setGridValues(color: string) {
    this.inputGridValues.forEach((grid: any) => {
      Array.from(this.gridRef.nativeElement.children).forEach((row: any, index) => {
        if (index === (grid.row - 1)) {
          Array.from(row.children).forEach((value, index) => {
            if (index === grid.col - 1 && grid.val != 0) {
              //&& this.puzzleIndexes.filter(x => x == index).length==0
              this.puzzleIndexes.push(index)
              row.children[index].children[0].setAttribute('value', grid.val);
              row.children[index].children[0].style.backgroundColor = color;
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
    this._rest.getNewPuzzle()
      .subscribe((response: PuzzleInput) => {
        this.disableStart = true;
        this.inputGridValues = response.puzzle;
        this.clearGridValues();
        this.setGridValues('lightgrey');
      }, getNewPuzzleErr => {
        this._log.log(getNewPuzzleErr);
      });
  }

  solvePuzzle() {
    this.loading = true;
    this._rest.solvePuzzle(this.inputGridValues)
      .subscribe((response: PuzzleInput) => {
        this.loading = false;
        if(response.puzzle.length < 81){
          this.notifierService.notify( 'success', 'Unable to Solve Puzzle. Please start a new one' );
          this.disableStart = false;
          return;
        }
        this.disableStart = false;
        this.inputGridValues = response.puzzle;
        this.setGridValues('red');
      }, getNewPuzzleErr => {
        this._log.log(getNewPuzzleErr);
      });
  }
}
