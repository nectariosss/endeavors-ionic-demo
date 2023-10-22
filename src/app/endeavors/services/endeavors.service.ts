import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endeavor } from '../models/endeavor';
import { ConfigService } from 'src/app/core/services/config.service';
import { BehaviorSubject, map } from 'rxjs';
import { NameGeneratorService } from './name-generator.service';

@Injectable({
  providedIn: 'root',
})
export class EndeavorsService {
  // -------------------  Public Variables  -------------------
  public baseUrl: string = this._configService.baseUrl + '/endeavors';
  public endeavors$: BehaviorSubject<Endeavor[]> = new BehaviorSubject<
    Endeavor[]
  >([]);

  constructor(
    private _nameGeneratorService: NameGeneratorService,
    private _configService: ConfigService,
    private _http: HttpClient
  ) {}

  getEndeavors() {
    return this._http
      .get(this.baseUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('passphrase'),
        },
        withCredentials: true,
      })
      .pipe(
        map((endeavors: Endeavor[]) => {
          this.endeavors$.next(endeavors);
          return endeavors;
        })
      );
  }

  updateEndeavor(endeavor) {
    return this._http.post(`${this.baseUrl}/update`, endeavor, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('passphrase'),
      },
      withCredentials: true,
    });
  }

  createEndeavor() {
    let endeavor: Endeavor = {
      isAmbient: false,
      isAttainable: false,
      isActive: false,
      archived: false,
      completed: false,
      name: this._nameGeneratorService.generateName(this.endeavors$.getValue()),
      instantAim: '',
      longAim: '',
      abstract: '',
      tasks: [],
      ideas: [],
      problems: [],
      resources: [],
      directives: [],
      timeframe: {
        hasTimeFrame: false,
        start: null,
        end: null,
      },
      score: {
        hasScore: false,
        upvotes: 0,
      },
      notes: '',
    };
    return this._http.post(`${this.baseUrl}/create`, endeavor, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('passphrase'),
      },
      withCredentials: true,
    });
  }

  deleteEndeavor(endeavor) {
    return this._http.post(`${this.baseUrl}/delete`, endeavor, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('passphrase'),
      },
      withCredentials: true,
    });
  }
}
