import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RestApisService } from './services/restApis.service';
import { Observable, of } from 'rxjs';
import { PuzzleInput } from './models/puzzle-input.model';
import { Puzzle } from './models/puzzle.model';
import { TableStructure } from './table-structure.directive';
import { LoggerService } from './services/logger.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

describe('AppComponent', () => {
  let app : AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let rest: RestApisService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    rest = TestBed.get(RestApisService);
    expect(app).toBeTruthy();
  });

  it(`should have as title 'web'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('web');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to web!');
  });

  it('should build new puzzle and disable start button',()=>{
    app.disableStart = false;
    spyOn(rest,'getNewPuzzle').and.returnValue(of(new PuzzleInput([new Puzzle(1,1,1)])));
    app.buildNewPuzzle();
    expect(app.disableStart).toBeTruthy();

  })
});
