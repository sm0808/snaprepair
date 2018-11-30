import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from "../home/home";

import { AuthService } from "../../services/auth-service";
import { TripService } from '../../services/trip-service';
import { TranslateService } from '@ngx-translate/core';

import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {

  public user        : any;
  public tripCount   : any = 0;
  public totalSpent  : any = 0;
  public tabs        : any = 'profile';
  public trips       : Array<any>;

  constructor(public nav: NavController, public authService: AuthService,
              public navParams: NavParams,public alertCtrl: AlertController,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController,
              public platform: Platform, public tripService: TripService,
              public translate: TranslateService) {

    let userx = navParams.get('user');
    this.authService.getUser(userx.uid).take(1).subscribe(snapshot => {
      snapshot.uid = snapshot.$key;
      this.user = snapshot;
      this.user.isEmailVerified = firebase.auth().currentUser.emailVerified;
      console.log(this.user);
      this.getTrips();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripsPage');
  }

  getTrips() {
    let loading = this.loadingCtrl.create({ content: 'Please wait...'});
    loading.present();
    this.tripService.getTrips().take(1).subscribe(snapshot => {
      this.trips = snapshot.reverse();
      loading.dismiss();
    });
  }

}
