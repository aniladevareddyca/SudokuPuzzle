import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RestApisService } from './services/restApis.service';
import { Observable, of } from 'rxjs';
import { PuzzleInput } from './models/puzzle-input.model';
import { Puzzle } from './models/puzzle.model';
import { TableStructure } from './table-structure.directive';
import { LoggerService } from './services/logger.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

fdescribe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let rest: RestApisService;
  let event: KeyboardEvent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgxLoadingModule.forRoot({}),
      ],
      declarations: [
        AppComponent,
        TableStructure
      ],
      providers: [
        RestApisService,
        LoggerService,
        HttpClient,
        HttpClientModule,
        HttpHandler
      ]
    }).compileComponents();
  }));

  beforeEach(function () {
    jasmine.clock().install();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    rest = TestBed.get(RestApisService);
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Sudoku');
  });

  it('should set isBuildYourOwn flag to false for generate new puzzle ', () => {
    app.isBuildYourOwn  = true;
    spyOn(rest, 'getNewPuzzle').and.returnValue(of(new PuzzleInput([new Puzzle(1, 1, 1)])));
    app.buildNewPuzzle(false);
    expect(app.isBuildYourOwn).toBeFalsy();
  })
  it('should set isBuildYourOwn flag to false if user builds a new puzzle ', () => {
    app.isBuildYourOwn  = false;
    app.buildOwnPuzzle();
    expect(app.isBuildYourOwn).toBeTruthy();
  })

  it('should build new puzzle and set the response to inputGridValues', () => {
    spyOn(rest, 'getNewPuzzle').and.returnValue(of(new PuzzleInput([new Puzzle(1, 1, 1)])));
    app.buildNewPuzzle(false);
    expect(app.inputGridValues).toEqual([new Puzzle(1, 1, 1)]);
  })

  it('should disable loading and enable start button once the puzzle is solved and set the response to inputGridValues', () => {
    app.loading = true;
    spyOn(rest, 'solvePuzzle').and.returnValue(of(new PuzzleInput([new Puzzle(1, 1, 1)])));
    app.solvePuzzle();
    expect(app.loading).toBeFalsy();
    expect(app.isBuildYourOwn).toBeFalsy();
    expect(app.inputGridValues).toEqual([new Puzzle(1, 1, 1)]);
  })


  it('should clear the timer', () => {
    app.duration = '00:00:00'
    app.clearTimer();
    expect(app.duration).toEqual('');
  })

  it('should start the timer', () => {
    var timerCallback = spyOn(global, 'setInterval');
    setTimeout(function () {
      timerCallback();
    }, 1000);
    expect(setInterval).not.toHaveBeenCalled();
    jasmine.clock().tick(1001);
    app.startTimer();
    expect(setInterval).toHaveBeenCalled();
  })



});
