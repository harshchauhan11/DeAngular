import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ConnectivityServiceProvider } from '../connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationParamProvider } from '../location-param/location-param'
import {} from '@types/google-maps';

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
 
  constructor(public connectivityService: ConnectivityServiceProvider, public geolocation: Geolocation, private locationParam: LocationParamProvider) {
    this.loc = locationParam.loc;
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
 
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
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
 
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
 
      this.geolocation.getCurrentPosition().then((position) => {
 
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.loc.lat = position.coords.latitude;
        this.loc.lng = position.coords.longitude;
        let geocoder = new google.maps.Geocoder();
        // geocoder.geocode({ location: this.loc }, function(results, status) {
        //   // console.log(typeof(status));
        //   // console.log(results[0]);
        //   // if (status == "OK") {
        //   //   if (results[0]) {
        //   //     for (
        //   //       var ac = 0;
        //   //       ac < results[0].address_components.length;
        //   //       ac++
        //   //     ) {
        //   //       var component = results[0].address_components[ac];
    
        //   //       if (
        //   //         component.types.includes("sublocality") ||
        //   //         component.types.includes("sublocality_level_1")
        //   //       ) {
        //   //         storableLocation.sublocality = component.short_name;
        //   //       } else if (
        //   //         component.types.includes("sublocality") ||
        //   //         component.types.includes("locality")
        //   //       ) {
        //   //         storableLocation.city = component.long_name;
        //   //       } else if (
        //   //         component.types.includes("administrative_area_level_1")
        //   //       ) {
        //   //         storableLocation.state = component.short_name;
        //   //       } else if (component.types.includes("country")) {
        //   //         storableLocation.country = component.long_name;
        //   //         storableLocation.registered_country_iso_code =
        //   //           component.short_name;
        //   //       }
        //   //     }
        //   //   } else {
        //   //     window.alert("No results found");
        //   //   }
            
        //   // } else {
        //   //   window.alert("Geocoder failed due to: " + status);
        //   // }
        // });
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
 
      });
 
    });
 
  }
 
  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    this.connectivityService.watchOnline().subscribe(() => {
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
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