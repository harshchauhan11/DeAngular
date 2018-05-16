import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as apiCall from './api-calls';

@Injectable()
export class ApiServiceProvider {
  constructor(public http: HttpClient) {
    console.log("Hello ApiServiceProvider Provider");
  }
}
