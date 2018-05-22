import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleMaps, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';

@Injectable()
export class NativeMapsProvider {

  map:any;

  constructor(public googleMaps: GoogleMaps) {
    console.log('Hello NativeMapsProvider Provider');
  }

  init(location, element): Promise<any> {
 
    return new Promise(resolve => {
      let latLng = new LatLng(location.latitude, location.longitude);
  
      let opts = {
        camera: {
          latLng: latLng,
          zoom: 11,
          tilt: 30
        }
      };
  
      this.map = this.googleMaps.create(element.nativeElement, opts);
  
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
      });
      resolve(true);
    });
  }
}
