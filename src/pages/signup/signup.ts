import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { Login } from "../login/login";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class Signup {
  responseData: any;
  userData = { username: "", password: "", name: "", email: "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider
  ) {}

  signup() {
    this.authService.postData(this.userData, "signup").then(
      result => {
        this.responseData = result;
        if (this.responseData.userData) {
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

  login() {
    //Login page link
    this.navCtrl.push(Login);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Signup");
  }
}
