import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { NavParams, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  templateUrl: 'tabs_store.html'
})
export class TabsStorePage {

  tab1Root = ProfilePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab1RootParam = {
    sid: 0,
    token: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
    // debugger;
    this.tab1RootParam.sid = parseInt(navParams.get("storeId"));
    this.tab1RootParam.token = navParams.get("token");
    console.log(this.tab1RootParam);
  }
}
