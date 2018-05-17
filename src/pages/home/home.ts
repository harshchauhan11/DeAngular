import { Component } from "@angular/core";
import { NavController, App, ModalController, Tab } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { LocationSelectPage } from "../location-select/location-select";
import { LocationParamProvider } from "../../providers/location-param/location-param";
import { Locations } from "../../providers/locations/locations";
import { ProfilePage } from "../profile/profile";
import { TabsStorePage } from "../tabs_store/tabs_store";
import { TabsPage } from "../tabs/tabs";

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
    // debugger;
    this.userDetails = data.body;

    this.userPostData.uid = parseInt(this.userDetails.uid, 10);
    this.userPostData.token = this.userDetails.token;
    this.loc = locationParam.loc;
  }

  ionViewDidEnter() {
    this.authService.getSavedLocations(this.userPostData).then(
      result => {
        this.responseData = result;
        if (this.responseData.status) {
          console.log(
            "responseData = " + JSON.stringify(this.responseData.body)
          );
          let l = JSON.parse(JSON.stringify(this.responseData.body[0]));
          this.loc.lat = l.latitude;
          this.loc.lng = l.longitude;
          this.loc.name = l.place;
          console.log("Loc, viewDidEnter = " + JSON.stringify(this.loc));
          this.getNearLocations(this.loc);
        } else {
          console.log("Location doesn't exists for this User.");
        }
      },
      err => {
        console.log(err);
      }
    );
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

        this.getNearLocations(this.loc);

        this.userPostData.lat = this.loc.lat;
        this.userPostData.lng = this.loc.lng;
        this.userPostData.place = this.loc.name;
        console.log(this.userPostData);
        debugger;
        this.authService.addLocation(this.userPostData).then(
          result => {
            console.log(result);
            this.responseData = result;
            if (this.responseData.status) {
              console.log("responseData = " + this.responseData);
            } else {
              console.log(
                "Location adding failed due to already exists or invalid."
              );
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

  getNearLocations(loc) {
    let locationsLoaded = this.locations.load(loc);
    console.log("LocationsLoaded = " + locationsLoaded);
    Promise.all([locationsLoaded]).then(result => {
      console.log("Result = " + result);
      let locations = result[0];
      console.log("Locations = " + locations);
      // debugger;
      for (let location of locations) {
        console.log(location);
      }
    });
  }

  profileStore(i) {
    console.log("Hello Store : "+i);

    // console.log(this.navCtrl.getActive().name);
    this.navCtrl.push(ProfilePage, {
      storeId: i,
      token: this.userPostData.token
    });
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
