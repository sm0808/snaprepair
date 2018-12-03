import { Component } from '@angular/core';
import { Platform, ModalController, AlertController, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
// import { Keyboard } from 'ionic-native/keyboard';

// import pages
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AdminOffersPage } from '../pages/admin-offers/admin-offers';
import { AdminAcceptedOffersPage } from '../pages/admin-accepted-offers/admin-accepted-offers';
import { ZipsPage } from '../pages/zips/zips';
import { UserRequestsPage } from '../pages/user-requests/user-requests';

import { PaymentMethodPage } from '../pages/payment-method/payment-method';
import { PlacesPage } from '../pages/places/places';
import { RegisterPage } from '../pages/register/register';
import { TrackingPage } from '../pages/tracking/tracking';
import { MapPage } from "../pages/map/map";
import { UserPage } from '../pages/user/user';
import { PaymentPage } from '../pages/payment/payment';
import { TripsPage } from '../pages/trips/trips';
import { SupportPage } from '../pages/support/support';
import { SharePage } from '../pages/share/share';
import { CommissionPage } from '../pages/commission/commission';
import { AboutPage } from '../pages/about/about';
import { WelcomePage } from '../pages/welcome/welcome';

import { AngularFireAuth } from "angularfire2/auth/auth";
import { AuthService } from "../services/auth-service";

import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';

import { USER_IMG_URL } from "../services/constants";


declare var google: any;
// end import pages
export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})

export class MyApp {
  public rootPage : any;
  public nav      : any;
  public name     : any = '';
  public email    : any = '';
  // public user: any = { photoURL: 'http://placehold.it/50x50' }; //setting default image, if user dont have images
  // public user     : any;
  public user     : any = { name: '', email: ''};
  public userPic  : any = '';
  appMenuItems: Array<MenuItem>;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, public afAuth: AngularFireAuth,
              public authService: AuthService, public alertCtrl: AlertController,
              public translate: TranslateService, public modalCtrl: ModalController,
              public geo: Geolocation, public backgroundMode: BackgroundMode,
              public events: Events) {

                // public keyboard: Keyboard
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    // this.platform.ready().then(() => {
    //   // Here I'm using the keyboard class from ionic native.
    //   Keyboard.disableScroll(true)
    //   StatusBar.styleDefault();
    // });
    this.appMenuItems = [];
    this.initializeApp();

    events.subscribe('user:updated', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', user, 'at', time);
      // Update User
      this.user    = JSON.parse(localStorage.getItem('userData'));
      this.name    = this.user.name;
      this.email   = this.user.email;
      this.userPic = USER_IMG_URL + this.user.image;
      this.setAppMenu();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.backgroundMode.enable();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.keyboard.disableScroll(true)

      // // let status bar overlay webview
      // this.statusBar.overlaysWebView(true);
      //
      // // set status bar to white
      // this.statusBar.backgroundColorByHexString('#ffffff');

      // check for login stage, then redirect
      this.user = JSON.parse(localStorage.getItem('userData'));
      console.log("this.user: ", this.user);
      if (this.user != null) {
        this.name    = this.user.name.toUpperCase();
        this.email   = this.user.email;
        this.userPic = USER_IMG_URL + this.user.image;
        this.setAppMenu();
      } else {
        this.nav.setRoot(WelcomePage);
      }
    });
  }

  setAppMenu() {
    if (this.user.isAdmin == '1') {
      console.log("isAdmin");
      this.appMenuItems = [
        { title: 'Recent Requests', component: HomePage, icon: 'ios-list-outline'},
        { title: 'Recent Offers', component: AdminOffersPage, icon: 'ios-pricetag-outline'},
        { title: 'Accepted Offers', component: AdminAcceptedOffersPage, icon: 'ios-checkmark-circle-outline'},
        { title: 'Mannage Zips', component: ZipsPage, icon: 'ios-navigate-outline'},
        { title: 'Profile', component: UserPage, icon: 'ios-contact-outline' },
        // { title: 'About Us', component: AboutPage, icon: 'ios-information-circle-outline' },
        // { title: 'My Recent Trips', component: TripsPage, icon: 'ios-pricetag-outline' },
        // { title: 'Payment', component: PaymentPage, icon: 'ios-card-outline' },
        // { title: 'Support', component: SupportPage, icon: 'ios-mail-outline' },
        // { title: 'Share', component: SharePage, icon: 'md-share' },
        // { title: 'Earn Commission', component: CommissionPage, icon: 'ios-cash-outline' },
      ];

      this.nav.setRoot(HomePage);
    }
    else {
      console.log("is Not Admin");
      this.appMenuItems = [
        { title: 'Recent Requests', component: UserRequestsPage, icon: 'ios-list-outline'},
        // { title: 'Recent Offers', component: AdminOffersPage, icon: 'ios-pricetag-outline'},
        // { title: 'Accepted Offers', component: AdminAcceptedOffersPage, icon: 'ios-checkmark-circle-outline'},
        // { title: 'Mannage Zips', component: ZipsPage, icon: 'ios-navigate-outline'},
        { title: 'Profile', component: UserPage, icon: 'ios-contact-outline' },
      ];

      this.nav.setRoot(UserRequestsPage);
    }
  }

  // view current user profile
  viewProfile() {
    this.nav.push(UserPage, {
      user: this.user
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == 'Map') {
      this.nav.push(page.component, {
        type: 'Destination'
      });
    }
    else {
      // this.nav.push(page.component, {
      //   user: this.user
      // });
      this.nav.setRoot(page.component, {
        user: this.user
      });
    }

  }

  logout() {
    // this.authService.logout().then(() => {
    //   this.nav.setRoot(WelcomePage);
    //   // this.nav.setRoot(LoginPage);
    // });
    localStorage.clear();
    this.nav.setRoot(WelcomePage);
    // this.nav.setRoot(LoginPage);
  }
  editprofile() {

  }
}
