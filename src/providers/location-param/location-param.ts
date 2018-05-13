import { Injectable } from '@angular/core';

@Injectable()
export class LocationParamProvider {
  loc: any;

  constructor() {
    console.log('Hello LocationParamProvider Provider');
    this.loc = { lat: 33.38, lng: 33.38, name: "Select Location" }
  }

}
