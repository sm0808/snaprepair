import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams, ViewController, Platform  } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { API_URL, IMG_URL } from "../../services/constants";
import { Requests } from "../../services/requests";

/**
 * Generated class for the ModalUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-user',
  templateUrl: 'modal-user.html',
})
export class ModalUserPage {

  public slidesPerView     : number = 2;
  public requests          : any;
  public request           : any;
  public requestModal      : any    = false;
  public offers            : any;
  public offer             : any;
  public images            : any    = [];
  public reqID             : any;
  public offerID           : any;
  public loading           : any;
  public imgloaded         : any    = [];
  public loadingAnimation  : any    = './assets/img/loading-animation.gif';

  constructor(public userService: UserProvider, public navCtrl: NavController,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public navParams: NavParams, public viewCtrl: ViewController,
              public platform : Platform, public requestService: Requests
            ) {

              if (navParams.get('reqID')) {
                this.requestModal = true;
                this.requests = JSON.parse(localStorage.getItem('requests'));
                this.reqID    = navParams.get('reqID');

                for (let i = 0; i < this.requests.length; i++) {
                  if(this.reqID == this.requests[i]['requestId']) {
                    this.request = this.requests[i];
                    break;
                  }
                }
                this.get_Request_Images();
                console.log("reqID",this.reqID);
              }
              else if(navParams.get('accepted_offerID')) {
                this.requestModal = false;
                this.offers   = JSON.parse(localStorage.getItem('accepted_offers'));
                this.offerID  = navParams.get('accepted_offerID');

                for (let i = 0; i < this.offers.length; i++) {
                  if(this.offerID == this.offers[i]['offerId']) {
                    this.offer = this.offers[i];
                    this.reqID = this.offer['requestId'];
                    break;
                  }
                }
                this.get_Request_Images();
                console.log("offer", this.offer);
              }
              else {
                this.requestModal = false;
                this.offers   = JSON.parse(localStorage.getItem('offers'));
                this.offerID  = navParams.get('offerID');
                console.log("offers: ",this.offers);
                console.log("offerID: ",this.offerID);


                for (let i = 0; i < this.offers.length; i++) {
                  if(this.offerID == this.offers[i]['offerId']) {
                    this.offer = this.offers[i];
                    this.reqID = this.offer['requestId'];
                    break;
                  }
                }
                this.get_Request_Images();
                console.log("offer", this.offer);
              }
  }

  get_Request_Images() {
    this.showLoading('Getting Details of Request');
    // Get Request Images
    this.requestService.get_Request_Images(this.reqID).then((result) => {
      let countImages = 0;
      for (let key in result) {
          let value = result[key];
          console.log("value: ",value);
          this.images.push(IMG_URL+''+value['img']);
          countImages++;
      }

      if(countImages == 1)
        this.slidesPerView = 1;
      this.hideLoading();
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('Screen Width is: ',this.platform.width());

    // On a desktop, and is wider than 1200px
    if(this.platform.width() > 1200) {
      this.slidesPerView = 5;
    }

    // On a desktop, and is wider than 768px
    else if(this.platform.width() > 768) {
      this.slidesPerView = 4;
    }

    // On a desktop, and is wider than 400px
    else if(this.platform.width() > 400) {
      this.slidesPerView = 2;
    }

    // On a desktop, and is wider than 319px
    else if(this.platform.width() > 319) {
      this.slidesPerView = 2;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({"foo" : "bar"});
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
