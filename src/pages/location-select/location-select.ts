import { Component, NgZone, ViewChild, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ViewController
} from "ionic-angular";
import { GoogleMapsProvider } from "../../providers/google-maps/google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import { LocationParamProvider } from "../../providers/location-param/location-param";
import {} from '@types/google-maps';

declare var google;

@IonicPage()
@Component({
  selector: "page-location-select",
  templateUrl: "location-select.html"
})
export class LocationSelectPage {
  @ViewChild("map") mapElement: ElementRef;
  @ViewChild("pleaseConnect") pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = "";
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  loc: any;
  storableLocation: any;
  geocoder: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    public maps: GoogleMapsProvider,
    public platform: Platform,
    public geolocation: Geolocation,
    public viewCtrl: ViewController,
    private locationParam: LocationParamProvider
  ) {
    this.searchDisabled = true;
    this.saveDisabled = false;
    this.loc = locationParam.loc;
    this.query = this.loc.name;
    this.storableLocation = {};
  }

  ionViewDidLoad(): void {
    console.log("In ionViewDidLoad");
    var q = {};

    let mapLoaded = this.maps
      .init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement)
      .then(
        () => {
          console.log("In mapLoaded");
          // console.log(this.maps.map.center.lat);
          this.autocompleteService = new google.maps.places.AutocompleteService();
          this.placesService = new google.maps.places.PlacesService(
            this.maps.map
          );
          this.searchDisabled = false;
          console.log(this.autocompleteService);
          // this.placesService.getDetails({ location: this.loc }, details => {
          //   this.zone.run(() => {
          //     // location.name = details.name;
          //     console.log(details.name);
          //   });
          // });
          // this.searchDisabled = true;

          this.geocoder = new google.maps.Geocoder();
          var that = this;
          that.query = "Loading your location ..";
          this.setStorableLoc(that, function(s) {
            that.query = s.sublocality;
            that.loc.name = s.sublocality;
            that.location = that.loc;
            // that.searchDisabled = false;
            // that.viewCtrl.dismiss(that.loc);
          });
          
          // console.log(q);
          
          
          // console.log(this.query);
          // console.log(this.storableLocation);
          // this.loc.name = this.storableLocation.sublocality;
          // console.log(this.query);
        },
        err => {
          console.log("Geolocation problem");
        }
      );
      
      // console.log(this.storableLocation);
    // this.searchDisabled = false;
  }

  setStorableLoc(that, myFunc) {
    var storableLocation = { sublocality: "", city: "", state: "", country: "", registered_country_iso_code: ""};
    this.geocoder.geocode({ location: this.loc }, function(results, status) {
      if (status === "OK") {
        if (results[0]) {
          // console.log(this.query);
          // console.log(results[0].address_components);

          for (
            var ac = 0;
            ac < results[0].address_components.length;
            ac++
          ) {
            var component = results[0].address_components[ac];

            if (
              component.types.includes("sublocality") ||
              component.types.includes("sublocality_level_1")
            ) {
              storableLocation.sublocality = component.short_name;
            } else if (
              component.types.includes("sublocality") ||
              component.types.includes("locality")
            ) {
              storableLocation.city = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_1")
            ) {
              storableLocation.state = component.short_name;
            } else if (component.types.includes("country")) {
              storableLocation.country = component.long_name;
              storableLocation.registered_country_iso_code =
                component.short_name;
            }
          }
          // that.query = storableLocation.sublocality;
          myFunc(storableLocation);
          // console.log(storableLocation);
          // this.setStorableLoc(storableLocation);
          // console.log(this);
          // this.viewCtrl.dismiss();
        } else {
          window.alert("No results found");
        }
        
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
      // console.log(storableLocation);
      // console.log(loc);
    });
    return storableLocation;
    // return this.storableLocation;
  }

  selectPlace(place) {
    // console.log("In selectPlace");
    this.places = [];

    let location = {
      lat: null,
      lng: null,
      name: place.name
    };

    this.placesService.getDetails({ placeId: place.place_id }, details => {
      this.zone.run(() => {
        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        this.saveDisabled = false;

        this.maps.map.setCenter({ lat: location.lat, lng: location.lng });
        this.query = location.name;

        this.location = location;
        console.log(this.location);
      });
    });
  }

  searchPlace() {
    // console.log("In searchPlace");
    this.saveDisabled = true;

    if (this.query.length > 0 && !this.searchDisabled) {
      let config = {
        types: ["geocode"],
        input: this.query
      };

      this.autocompleteService.getPlacePredictions(
        config,
        (predictions, status) => {
          if (
            status == google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            this.places = [];

            predictions.forEach(prediction => {
              this.places.push(prediction);
            });
          }
        }
      );
    } else {
      this.places = [];
    }
  }

  save() {
    console.log("Loc = " + this.location);
    this.viewCtrl.dismiss(this.location);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
