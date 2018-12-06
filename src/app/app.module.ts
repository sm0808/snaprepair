import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { IonicImageLoader } from 'ionic-image-loader';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Import moment module
import { MomentModule } from 'angular2-moment';

// import services
import { DriverService } from '../services/driver-service';

import { PlaceService } from '../services/place-service';
import { TripService } from '../services/trip-service';
import { SettingService } from "../services/setting-service";
import { DealService } from "../services/deal-service";
import { AuthService } from "../services/auth-service";
import { Requests } from "../services/requests";
import { Offers } from "../services/offers";
import { Zips } from "../services/zip";

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AdminOffersPage } from '../pages/admin-offers/admin-offers';
import { AdminAcceptedOffersPage } from '../pages/admin-accepted-offers/admin-accepted-offers';
import { ZipsPage } from '../pages/zips/zips';
import { UserRequestsPage } from '../pages/user-requests/user-requests';
import { UserOffersPage } from '../pages/user-offers/user-offers';
import { UserMakeRequestPage } from '../pages/user-make-request/user-make-request';

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
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { ModalPage } from '../pages/modal/modal';

//Import plugins
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserProvider } from '../providers/user/user';
import { UpdateCard } from '../pages/updatecard/updatecard';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

export const firebaseConfig = {
  // apiKey: "AIzaSyASfN_OVXgjuLbKKv6TKul-1S14joHFzww",
  // authDomain: "ionfiretaxi.firebaseapp.com",
  // databaseURL: "https://ionfiretaxi.firebaseio.com",
  // projectId: "ionfiretaxi",
  // storageBucket: "ionfiretaxi.appspot.com",
  // messagingSenderId: "493104185856"

  apiKey: "AIzaSyC08IhmXMpnFj2yJbsNcA2LqUU6bKo_F3Y",
  authDomain: "yurdriver-55498.firebaseapp.com",
  databaseURL: "https://yurdriver-55498.firebaseio.com",
  projectId: "yurdriver-55498",
  storageBucket: "yurdriver-55498.appspot.com",
  messagingSenderId: "163425583846"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AdminOffersPage,
    AdminAcceptedOffersPage,
    ZipsPage,
    UserRequestsPage,
    UserOffersPage,
    UserMakeRequestPage,
    PaymentMethodPage,
    PlacesPage,
    RegisterPage,
    TrackingPage,
    MapPage,
    UserPage,
    PaymentPage,
    TripsPage,
    SupportPage,
    SharePage,
    CommissionPage,
    AboutPage,
    WelcomePage,
    ConfirmationPage,
    ModalPage,
    UpdateCard
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicImageViewerModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    IonicImageLoader.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MomentModule,
    IonicModule.forRoot(MyApp,{
      mode: 'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AdminOffersPage,
    AdminAcceptedOffersPage,
    ZipsPage,
    UserRequestsPage,
    UserOffersPage,
    UserMakeRequestPage,
    PaymentMethodPage,
    PlacesPage,
    RegisterPage,
    TrackingPage,
    MapPage,
    UserPage,
    PaymentPage,
    TripsPage,
    UpdateCard,
    SupportPage,
    SharePage,
    CommissionPage,
    AboutPage,
    WelcomePage,
    ConfirmationPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    BackgroundMode,
    Geolocation,
    DriverService,
    PlaceService,
    TripService,
    SettingService,
    DealService,
    AuthService,
    CallNumber,
    SocialSharing,
    Requests,
    Offers,
    Zips,
    ImagePicker,
		Crop,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider
  ]
})
export class AppModule {
}
