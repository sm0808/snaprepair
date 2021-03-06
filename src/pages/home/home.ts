import { Component, ChangeDetectorRef, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, ToastController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ModalPage } from '../modal/modal';
import { API_URL, IMG_URL, USER_IMG_URL } from "../../services/constants";

import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from "angularfire2/auth/auth";
import { AuthService } from "../../services/auth-service";
import { Requests } from "../../services/requests";
import { Offers } from "../../services/offers";
import * as firebase from 'firebase';

import { TranslateService } from '@ngx-translate/core';

declare var google: any;
declare var InfoBubble: any;
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  // Intialize all Variables
  public requests          : any = [];
  public user              : any;
  public USER_IMG_URL      : any = USER_IMG_URL;
  public loading           : any;
  public imgloaded         : any = [];
  public loadingAnimation  : any = './assets/img/loading-animation.gif';

  constructor(public nav: NavController, public platform: Platform, public alertCtrl: AlertController,
              public requestService: Requests, public geolocation: Geolocation,
              public loadingCtrl: LoadingController, public translate: TranslateService,
              public elRef: ElementRef, public toastCtrl: ToastController,
              public navParams: NavParams, public localNotifications: LocalNotifications,
              public modalCtrl: ModalController, public offerService: Offers) {
      // this.translate.setDefaultLang('en');
      this.user = JSON.parse(localStorage.getItem('userData'));

      let loading = this.loadingCtrl.create({ content: 'Getting Requests...' });
      loading.present();

      // Get Requests for Admin
      this.requestService.get_Requests().then((result) => {
        loading.dismiss();
        this.requests = result;
        for (let i = 0; i < this.requests.length; i++) {
          this.requests[i]['img'] = IMG_URL + '' + this.requests[i]['img'];
        }
        localStorage.setItem('requests', JSON.stringify(this.requests));
        console.log('this.requests: ',this.requests);
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });
  }

  ionViewDidLoad() {

  }

  ionViewWillLeave() {

  }

  // Push Notification
  singlenotification(id, title, text) {
    this.localNotifications.schedule({
      id: id,
      title: title,
      text: text
    });
  }


  // Show note popup when click to 'Submit Offer'
  showNotePopup(reqID) {
    let prompt = this.alertCtrl.create({
      title: 'Submit Offer',
      message: "",
      inputs: [
        {
          name: 'price',
          placeholder: 'Price to Offer'
        },
        {
          name: 'description',
          placeholder: 'Description'
        },
      ],

      buttons: [
        {
          text: 'Cancel',
          cssClass:'CancelCss',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          cssClass:'SendCss',
          handler: data => {
            this.send_Offer(reqID, data['price'], data['description']);
          }
        }
      ]
    });
    prompt.present();
  };

  send_Offer(reqID, price, desc) {
    // Send Admin Offer
    this.showLoading('Sending Offer...');
    this.offerService.send_Offer(reqID, price, desc).then((result) => {
      if(result) {
        for (let i = 0; i < this.requests.length; i++) {
          if (reqID == this.requests[i]['requestId']) {
            this.requests.splice(i, 1);
            break;
          }
        }
      }
      this.showToast('Offer Sent');
      this.hideLoading();
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  showAlert(title, mesasge) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mesasge,
      buttons: ['OK']
    });
    alert.present();
  }

  viewDetails(requestID) {
    console.log("requestID: ",requestID);
    let Modal = this.modalCtrl.create(ModalPage, { reqID: requestID});
    Modal.present();
  }
}
