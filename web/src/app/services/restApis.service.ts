import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PuzzleInput } from '../models/puzzle-input.model';
import { Puzzle } from '../models/puzzle.model';

@Injectable()
export class RestApisService{
    baseURL = '';
    constructor(private _http: HttpClient){
        this.baseURL = 'http://localhost:8885';
    }

    ping(): Observable<string>{
        return this._http.get<string>(this.baseURL + '/ping');
    }

    getNewPuzzle() : Observable<PuzzleInput>{
        return this._http.get<PuzzleInput>(this.baseURL + '/api/v1/getPuzzle');
    }

    solvePuzzle(request: Array<Puzzle>) : Observable<PuzzleInput>{
        return this._http.post<PuzzleInput>(this.baseURL + '/api/v1/solvePuzzle',new PuzzleInput(request));
    }

    protected buildHeaders(): any{
        return new HttpHeaders({'Content-Type': 'application/json'});
    }
}