import { HttpClient } from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import * as apiCalls from "../api-service/api-calls";

@Injectable()
export class AuthServiceProvider {
  constructor(public http: Http) {
    console.log("Hello AuthServiceProvider Provider");
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http
        .post(type, JSON.stringify(credentials), { headers: headers })
        .subscribe(
          res => {
            resolve(res.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http
        .post(type, JSON.stringify(credentials), { headers: headers })
        .subscribe(
          res => {
            resolve(res.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  checkLogin(userData) {
    return this.postData(userData, apiCalls.postLoginApi);
  }

  addLocation(userPostData) {
    debugger;
    return this.postData(userPostData, apiCalls.postLocationApi);
  }

  getNearLocations(location) {
    return this.postData(location, apiCalls.postNearApi);
  }

  getSavedLocations(userPostData) {
    // debugger;
    return this.postData(userPostData, apiCalls.postLocationHistoryApi);
  }

  getVendorProfile(req) {
    return this.postData(req, apiCalls.getVendorProfileApi);
  }
}
