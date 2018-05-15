import { Component } from "@angular/core";
import { NavController, App, ModalController } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { LocationSelectPage } from "../location-select/location-select";
import { LocationParamProvider } from "../../providers/location-param/location-param";
import { Locations } from "../../providers/locations/locations";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  userDetails: any;
  responseData: any;
  // loc: any;
  loc = { lat: null, lng: null, name: "" };
  locationName = "Select Location";
  // loc: LocationParam[];

  userPostData = {
    uid: 0,
    eType: 1,
    token: "",
    lat: null,
    lng: null,
    place: ""
  };

  constructor(
    public navCtrl: NavController,
    public app: App,
    public authService: AuthServiceProvider,
    public modalCtrl: ModalController,
    private locationParam: LocationParamProvider,
    public locations: Locations
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.body;

    this.userPostData.uid = parseInt(this.userDetails.uid, 10);
    this.userPostData.token = this.userDetails.token;
    this.loc = locationParam.loc;
  }

  launchLocationPage() {
    // let loc = this.loc;
    let modal = this.modalCtrl.create(LocationSelectPage);

    modal.onDidDismiss(location => {
      if (location != undefined) {
        console.log("In HOME, " + location);
        let loc = {
          lat: null,
          lng: null,
          name: ""
        };
        loc.lat = location.lat;
        loc.lng = location.lng;
        loc.name = location.name;
        this.locationName = location.name;
        this.loc = loc;

        let locationsLoaded = this.locations.load(this.loc);
        console.log("LocationsLoaded = " + locationsLoaded);
        Promise.all([locationsLoaded]).then(result => {
          console.log("Result = " + result);
          let locations = result[0];
          console.log("Locations = " + locations);
          debugger;
          for (let location of locations) {
            console.log(location);
            // this.maps.addMarker(location.latitude, location.longitude);
          }
        });

        this.userPostData.lat = this.loc.lat;
        this.userPostData.lng = this.loc.lng;
        this.userPostData.place = this.loc.name;
        console.log(this.userPostData);
        this.authService.postData(this.userPostData, "location.php").then(
          result => {
            console.log(result);
            this.responseData = result;
            if (this.responseData.status) {
              console.log("responseData = " + this.responseData);
              // localStorage.setItem("userData", JSON.stringify(this.responseData));
              // this.navCtrl.push(TabsPage);
            } else {
              console.log("User already exists");
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    });
    // modal.onDidDismiss(() => {
    //   console.log("User denied geolocation prompt");
    // });

    modal.present();
  }

  backToWelcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout() {
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }
}
