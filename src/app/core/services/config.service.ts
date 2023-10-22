import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // When running the server locally (for development)
  public isLocal: boolean = false;
  // When the app runs with the in-memory database (to publish for demo purposes)
  public isDemo: boolean = true;
  // When the app runs with real data for personal useage
  public isDefault: boolean = false;

  private _localUrl = 'http://localhost:3000';
  private _remoteUrl = 'https://endeavors-api.azurewebsites.net';
  private _demoUrl = 'api';

  public baseUrl: string = this.isLocal ? this._localUrl : this.isDemo ? this._demoUrl : this._remoteUrl;

  constructor() {
  }

}
