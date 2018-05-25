import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Welcome } from '../pages/welcome/welcome';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Products } from '../pages/products/products';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { LocationSelectPage } from '../pages/location-select/location-select';
import { LocationParamProvider } from '../providers/location-param/location-param';
import { Locations } from '../providers/locations/locations';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { ProfilePage } from '../pages/profile/profile';
import { TabsStorePage } from '../pages/tabs_store/tabs_store';
import { NativeMapsProvider } from '../providers/native-maps/native-maps';
import { JsMapsProvider } from '../providers/js-maps/js-maps';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapsProvider } from '../providers/maps/maps';

import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    Welcome,
    Login,
    Signup,
    TabsPage,
    TabsStorePage,
    Products,
    LocationSelectPage,
    ProfilePage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    Welcome,
    Login,
    Signup,
    TabsPage,
    TabsStorePage,
    Products,
    LocationSelectPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthServiceProvider,
    ConnectivityServiceProvider,
    GoogleMapsProvider,
    Geolocation,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationParamProvider,
    Locations,
    ApiServiceProvider,
    NativeMapsProvider,
    JsMapsProvider,
    GoogleMaps,
    MapsProvider
  ]
})
export class AppModule {}
