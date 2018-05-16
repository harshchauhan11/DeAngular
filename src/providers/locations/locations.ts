import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AuthServiceProvider } from "../auth-service/auth-service";

@Injectable()
export class Locations {
  data: any;
  responseData: any;

  constructor(public http: Http, public authService: AuthServiceProvider) {}

  load(loc) {
    // debugger;
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.authService.getNearLocations(loc).then(
        result => {
          // this.http.get('assets/data/locations.json').map(res => res.json()).subscribe(data => {

          this.responseData = JSON.parse(JSON.stringify(result));
          if (this.responseData.status) {
            console.log(JSON.parse(JSON.stringify(this.responseData)));
            this.data = this.applyHaversine(JSON.parse(JSON.stringify(this.responseData.body)));

            this.data.sort((locationA, locationB) => {
              return locationA.distance - locationB.distance;
            });

            resolve(this.data);
            // localStorage.setItem("userData", JSON.stringify(this.responseData));
            // this.navCtrl.push(TabsPage);
          } else {
            console.log("Near Locations not found.");
          }
        },
        err => {
          // Error log
        }
      );
    });
  }

  applyHaversine(locations) {
    let usersLocation = {
      lat: 40.713744,
      lng: -74.009056
    };

    locations.map(location => {
      let placeLocation = {
        lat: location.latitude,
        lng: location.longitude
      };

      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        "miles"
      ).toFixed(2);
    });

    return locations;
  }

  getDistanceBetweenPoints(start, end, units) {
    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || "miles"];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad(lat2 - lat1);
    let dLon = this.toRad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;
  }

  toRad(x) {
    return x * Math.PI / 180;
  }
}
