import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { ConnectivityServiceProvider } from "../connectivity-service/connectivity-service";
import { Geolocation } from "@ionic-native/geolocation";
import { GoogleMap, GoogleMaps, GoogleMapsEvent } from "@ionic-native/google-maps";
import { LocationParamProvider } from "../location-param/location-param";
import {} from "@types/google-maps";
import { NativeMapsProvider } from "../native-maps/native-maps";
import { JsMapsProvider } from "../js-maps/js-maps";
import { MapsProvider } from "../maps/maps";

declare var google;

@Injectable()
export class GoogleMapsProvider {
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyCZo0kxIB_FBr3J76voR7bZBdfEJLwCLPQ";
  loc: any;

  location: {
    latitude: number;
    longitude: number;
  };

  constructor(
    public connectivityService: ConnectivityServiceProvider,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    private locationParam: LocationParamProvider,
    public platform: Platform,
    public mapsProvider: MapsProvider
  ) {
    this.loc = locationParam.loc;
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise(resolve => {
      
      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      } else {

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

        resolve(true);

      }

      this.addConnectivityListeners();
    });
  }

  initMap(): Promise<any> {
    // debugger;
    this.mapInitialised = true;
    // var that = this;

    return new Promise(resolve => {
      this.geolocation
        .getCurrentPosition()
        .then(position => {
          let latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          let location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log(position.coords.longitude);
          console.log(position.coords.latitude);
          this.loc.lat = position.coords.latitude;
          this.loc.lng = position.coords.longitude;
          // that.location.latitude = position.coords.latitude;
          // that.location.longitude = position.coords.longitude;
          console.log(this.loc.longitude);
          console.log(this.loc.latitude);

          let mapOptions = {
            center: latLng,
            zoom: 15,
            tilt: 30,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          // this.map = GoogleMaps.create(this.mapElement, mapOptions);
          this.map = new google.maps.Map(this.mapElement, mapOptions);
  
          // this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          //   console.log('Map is ready!');
          // });
          
          // this.mapsProvider.init(location, this.mapElement);
          resolve(true);
        })
        .catch(error => {
          console.log("Error getting location", error);
          resolve(false);
        });
    });
  }

  disableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  enableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }
  }

  addConnectivityListeners(): void {
    this.connectivityService.watchOnline().subscribe(() => {
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        } else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);
    });

    this.connectivityService.watchOffline().subscribe(() => {
      this.disableMap();
    });
  }
}
