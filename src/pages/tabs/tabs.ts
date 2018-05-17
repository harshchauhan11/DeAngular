import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabs = [
    { title: "Home", root: HomePage, icon: "home" },
    { title: "About", root: AboutPage, icon: "information-circle" },
    { title: "Contact", root: ContactPage, icon: "contacts" }
  ];
  // tab1Root = HomePage;
  // tab2Root = AboutPage;
  // tab3Root = ContactPage;

  constructor() {
    this.tabs = [
      { title: "Home", root: HomePage, icon: "home" },
      { title: "About", root: AboutPage, icon: "information-circle" },
      { title: "Contact", root: ContactPage, icon: "contacts" }
    ];
  }
}
