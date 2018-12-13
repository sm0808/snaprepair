import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, ToastController, NavParams, ModalController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ModalPage } from '../modal/modal';
import { API_URL, IMG_URL, USER_IMG_URL } from "../../services/constants";

import { Requests } from "../../services/requests";
import { Offers } from "../../services/offers";

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the UserOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-offers',
  templateUrl: 'user-offers.html',
})
export class UserOffersPage {

  public offers            : any;
  public user              : any;
  public USER_IMG_URL      : any = USER_IMG_URL;
  public loading           : any;
  public imgloaded         : any = [];
  public loadingAnimation  : any = './assets/img/loading-animation.gif';

  constructor(public nav: NavController, public platform: Platform, public alertCtrl: AlertController,
    public requestService: Requests,
    public loadingCtrl: LoadingController, public translate: TranslateService,
    public toastCtrl: ToastController, public navParams: NavParams,
    public localNotifications: LocalNotifications, public modalCtrl: ModalController,
    public offerService: Offers) {

      this.user = JSON.parse(localStorage.getItem('userData'));
      this.showLoading('Getting Recent Offers');

      // Get Offers by Admin
      this.offerService.get_user_accepted_offers(this.user.userId).then((result) => {
        this.offers = result;
        for (let i = 0; i < this.offers.length; i++) {
          this.offers[i]['img'] = IMG_URL + '' + this.offers[i]['img'];
        }
        localStorage.setItem('offers', JSON.stringify(this.offers));

        this.hideLoading();
        console.log('this.offers: ',this.offers);
      }, (err) => {
        this.hideLoading();
        console.log(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminOffersPage');
  }

  viewDetails(offerID) {
    console.log("offerID: ",offerID);
    let Modal = this.modalCtrl.create(ModalPage, { offerID: offerID});
    Modal.present();
  }

  // Show note popup when click to 'Update Quote'
  showUpdatePopup(offerID, oldPrice) {
    let prompt = this.alertCtrl.create({
      title: 'Update Offer',
      message: "",
      inputs: [
        {
          name: 'price',
          placeholder: 'Previous price: '+ oldPrice
        }
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
            this.update_Quote(offerID, data['price']);
          }
        }
      ]
    });
    prompt.present();
  };

  update_Quote(offerID, price) {
    console.log("offerID: ",offerID);
    console.log("price: ",price);

    // Send Admin Offer
    this.showLoading('Updating Offer...');
    this.offerService.update_Offer(offerID, price).then((result) => {
      if(result) {
        for (let i = 0; i < this.offers.length; i++) {
          if (offerID == this.offers[i]['offerId']) {
            this.offers[i]['price'] = price;
            break;
          }
        }
      }
      localStorage.setItem('offers', JSON.stringify(this.offers));     // Update Offers in localStorage
      this.showToast('Offer Updated');
      this.hideLoading();
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
  }

  cancelRequest(reqID, offerID, accept_status) {
    console.log("reqID: ",reqID);
    console.log("offerID: ",offerID);
    let message = '';
    if(accept_status == 'Processing')
      message = 'Are you sure you want to cancel this request?';
    else
      message = 'Cancelling the request at \'In Transit\' stage will cost you 20% of the offered prize. <br> Are you sure you want to cancel this request?';
    
    this.presentConfirm(reqID, offerID, message)
  }

  presentConfirm(requestId, offerID, message) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Cancellation',
      message: message,
      buttons: [
        {
          text: 'Decline',
          cssClass:'CancelCss',
          role: 'cancel',
          handler: () => {
            console.log('Decline clicked');
            // this.updateRequest_Offer_Status(offerID, '-1', requestId)
          }
        },
        {
          text: 'Accept',
          cssClass:'SendCss',
          handler: () => {
            console.log('Accept clicked offerID: ', offerID + ' requestId: ' + requestId);
            // this.updateRequest_Offer_Status(offerID, '1', requestId)
          }
        }
      ]
    });
    alert.present();
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
