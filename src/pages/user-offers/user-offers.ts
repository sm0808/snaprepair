import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, ToastController, NavParams, ModalController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ModalPage } from '../modal/modal';
import { API_URL, IMG_URL, USER_IMG_URL } from "../../services/constants";

import { Requests } from "../../services/requests";
import { Offers } from "../../services/offers";

import { TranslateService } from '@ngx-translate/core';

declare var StripeCheckout: any;

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

  public offers            : any = [];
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

      console.log("StripeCheckout: ",StripeCheckout);

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

  cancelRequest(offerID, accept_status, price) {
    console.log("offerID: ",offerID);
    let message   = '';
    let inTransit = false;
    if(accept_status == 'Processing') {
      message = 'Are you sure you want to cancel this request?';
    }
    else {
      message   = 'Cancelling the request at \'In Transit\' stage will cost you 20% of the offered price. <br> Are you sure you want to cancel this request?';
      inTransit = true;
    }
    this.presentConfirm(offerID, message, inTransit, price);
  }

  presentConfirm(offerID, message, inTransit, price) {
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
          }
        },
        {
          text: 'Accept',
          cssClass:'SendCss',
          handler: () => {
            console.log('Accept clicked offerID: ', offerID);
            if(inTransit) {
              price = (price * 60) / 100;  // 60% Charge for Cancellation
              this.Payment(offerID, '1', price, 'Cancellation Charges of Request In Transit Stage');
            }
            else {
              price = (price * 20) / 100;  // 20% Charge for Cancellation
              this.Payment(offerID, '1', price, 'Cancellation Charges of Request In Processing Stage');
              // this.cancel_Request(offerID, '1');
            }
            // this.updateRequest_Offer_Status(offerID, '1', requestId)
          }
        }
      ]
    });
    alert.present();
  }

  Payment(offerID, isCancelled, price, desc) {

    this.showLoading('Please Wait');
    let self = this;
    for (let i = 0; i < this.offers.length; i++) {
      if(this.offers[i]['offerId'] == offerID) {
        let offer = this.offers[i];

        console.log("offer: " , offer);
        console.log("price: " , price);
        console.log("desc: " , desc);

        var handler = StripeCheckout.configure({
          key: 'pk_test_lc3DMraJHlJtQLWNNvnXjPvA',
          // image: '../assets/img/icon/logo.png',
          image: 'https://snaprepair1.com/SnapRepair_App/images/logo.png',
          locale: 'auto',
          email:  offer['email'],
          opened: function() {
            self.hideLoading();
          },
          token: function(token) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log("token: ",token.id);
            self.stripePayment_To_Server(offerID, token.id, offer['email'], price, isCancelled);
          },
        });

        // Open Checkout with further options:
        handler.open({
          name: 'SnapRepair',
          description: desc,
          amount: price + '00'
        });

        // Close Checkout on page navigation:
        window.addEventListener('popstate', function() {
          handler.close();
        });

        break;
      }
    }
  }

  stripePayment_To_Server(offerID, token, email, price, isCancelled) {
    this.showLoading('Confirming Payment');
    this.offerService.charge_accepted_Offer(offerID, token, email, price, isCancelled).then((result) => {
      console.log("result: ",result);

      if(result) {
        for (let i = 0; i < this.offers.length; i++) {
          if (offerID == this.offers[i]['offerId']) {
            this.offers[i]['isComplete'] = '1';
            this.offers[i]['isCancelled'] = isCancelled;
            this.showToast('Payment Complete. Thanks!');
            this.hideLoading();
            break;
          }
        }
      }
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
  }

  cancel_Request(offerID, isCancelled) {
    this.showLoading('Cancelling Request');
    this.offerService.cancel_Request(offerID, isCancelled).then((result) => {
      console.log("result: ",result);

      if(result) {
        for (let i = 0; i < this.offers.length; i++) {
          if (offerID == this.offers[i]['offerId']) {
            this.offers[i]['isCancelled'] = isCancelled;
            this.showToast('Request Cancelled Successfully!');
            this.hideLoading();
            break;
          }
        }
      }
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
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
      duration: 2500,
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
