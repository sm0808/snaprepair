import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, ToastController, NavParams, ModalController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ModalPage } from '../modal/modal';
import { API_URL, IMG_URL, USER_IMG_URL } from "../../services/constants";

import { Requests } from "../../services/requests";
import { Offers } from "../../services/offers";

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AdminAcceptedOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin-accepted-offers',
  templateUrl: 'admin-accepted-offers.html',
})
export class AdminAcceptedOffersPage {

  public offers            : any;
  public user              : any;
  public USER_IMG_URL      : any = USER_IMG_URL;
  public offerStatus       : any;
  public loading           : any;
  public imgloaded         : any = [];
  public loadingAnimation  : any = './assets/img/loading-animation.gif';

  constructor(public nav: NavController, public platform: Platform, public alertCtrl: AlertController,
    public requestService: Requests,
    public loadingCtrl: LoadingController, public translate: TranslateService,
    public toastCtrl: ToastController, public navParams: NavParams,
    public localNotifications: LocalNotifications, public modalCtrl: ModalController,
    public offerService: Offers) {

      this.showLoading('Getting Accepted Offers');
      this.offerStatus = 'Processing';

      // Get Offers by Admin
      this.offerService.get_accepted_offers().then((result) => {
        this.hideLoading();
        this.offers = result;
        for (let i = 0; i < this.offers.length; i++) {
          this.offers[i]['img'] = IMG_URL + '' + this.offers[i]['img'];
        }
        localStorage.setItem('accepted_offers', JSON.stringify(this.offers));
        console.log('this.offers: ',this.offers);
      }, (err) => {
        this.hideLoading();
        console.log(err);
      });
  }

  updateAcceptStatus(offerID, status) {
    console.log("offerID: ",offerID);
    console.log("status: ",status);

    this.showLoading('Updating Status');

    this.offerService.update_accepted_Offer_Status(offerID, status).then((result) => {
      this.hideLoading();
      console.log('result: ',result);
      if (result) {
        this.showToast('Status Updated');
      }
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAcceptedOffersPage');
  }

  viewDetails(offerID) {
    console.log("offerID: ",offerID);
    let Modal = this.modalCtrl.create(ModalPage, { accepted_offerID: offerID});
    Modal.present();
  }

  // Push Notification
  singlenotification(id, title, text) {
    this.localNotifications.schedule({
      id: id,
      title: title,
      text: text
    });
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
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

}
