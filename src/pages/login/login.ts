import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Signup } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  responseData: any;
  userData = { username: "", password: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
  }

  login() {
    this.authService.checkLogin(this.userData).then(
      result => {
        // console.log(result);
        this.responseData = result;
        if (this.responseData.status) {
          console.log(this.responseData);
          localStorage.setItem("userData", JSON.stringify(this.responseData));
          this.navCtrl.push(TabsPage);
        } else {
          console.log("User already exists");
        }
      },
      err => {
        // Error log
      }
    );
  }

  signup() {
    //Signup page link
    this.navCtrl.push(Signup);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
