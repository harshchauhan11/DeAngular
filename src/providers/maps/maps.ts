import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeMapsProvider } from '../native-maps/native-maps';
import { JsMapsProvider } from '../js-maps/js-maps';
import { GoogleMaps } from '@ionic-native/google-maps';

@Injectable()
export class MapsProvider {

  map: any;

  constructor(public platform: Platform) {
    console.log('Hello MapsProvider Provider');
    if(this.platform.is('cordova') && 
      (this.platform.is('ios') || this.platform.is('android'))){
      this.map = new NativeMapsProvider(GoogleMaps);
      console.log("Its Native.");
    } else {
      this.map = new JsMapsProvider();
      console.log("Its JS.");
    }
  }

  init(location, element){
    this.map.init(location, element);
    console.log(location.longitude);
    console.log(location.latitude);
  }
}
